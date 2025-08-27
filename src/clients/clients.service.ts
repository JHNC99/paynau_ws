import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { Client } from './entities/client.entity';
import { Gender } from './entities/gender.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

/** Exportamos ServiceResponse para evitar TS4053 */
export interface ServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  code?: number;
}

@Injectable()
export class ClientsService {
  private readonly logger = new Logger(ClientsService.name);

  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Gender)
    private readonly genderRepository: Repository<Gender>,
  ) {}

  /** CREATE */
  async create(dto: CreateClientDto): Promise<ServiceResponse<Client>> {
    try {
      const gender = await this.getGenderOrFail(dto.gender_id);

      const client = this.clientRepository.create({ ...dto, gender });
      await this.clientRepository.save(client);

      return {
        success: true,
        message: 'Cliente creado correctamente',
        data: client,
      };
    } catch (err: unknown) {
      return this.handleException(err);
    }
  }

  /** FIND ALL */
  async findAll(): Promise<ServiceResponse<Client[]>> {
    try {
      const clients = await this.clientRepository.find({
        relations: ['gender'],
      });
      return { success: true, message: 'Clientes encontrados', data: clients };
    } catch (err: unknown) {
      return this.handleException(err);
    }
  }

  /** FIND ONE */
  async findOne(id: string): Promise<ServiceResponse<Client>> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['gender'],
    });
    if (!client)
      throw new NotFoundException({
        success: false,
        message: 'Cliente no encontrado',
      });

    return { success: true, message: 'Cliente encontrado', data: client };
  }

  /** UPDATE */
  async update(
    id: string,
    dto: UpdateClientDto,
  ): Promise<ServiceResponse<Client>> {
    try {
      const client = await this.clientRepository.findOne({
        where: { id },
        relations: ['gender'],
      });
      if (!client)
        throw new NotFoundException({
          success: false,
          message: 'Cliente no encontrado',
        });

      if (dto.gender_id !== undefined) {
        client.gender = await this.getGenderOrFail(dto.gender_id);
      }

      Object.assign(client, dto);
      await this.clientRepository.save(client);

      return {
        success: true,
        message: 'Cliente actualizado correctamente',
        data: client,
      };
    } catch (err: unknown) {
      return this.handleException(err);
    }
  }

  /** DELETE */
  async remove(id: string): Promise<ServiceResponse<Client>> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client)
      throw new NotFoundException({
        success: false,
        message: 'Cliente no encontrado',
      });

    await this.clientRepository.remove(client);
    return {
      success: true,
      message: 'Cliente eliminado correctamente',
      data: client,
    };
  }

  /** GET ALL GENDERS */
  async getAllGenders(): Promise<ServiceResponse<Gender[]>> {
    try {
      const genders = await this.genderRepository.find();
      return { success: true, message: 'Géneros encontrados', data: genders };
    } catch (err: unknown) {
      return this.handleException(err);
    }
  }

  /** PRIVATE: Validate Gender Exists */
  private async getGenderOrFail(id: number): Promise<Gender> {
    const gender = await this.genderRepository.findOneBy({ id });
    if (!gender)
      throw new NotFoundException({
        success: false,
        message: 'Género no encontrado',
      });
    return gender;
  }

  /** PRIVATE: Handle Exceptions */
  private handleException(err: unknown): never {
    if (
      err instanceof QueryFailedError &&
      'code' in err &&
      (err as { code?: string }).code === 'ER_DUP_ENTRY'
    ) {
      throw new BadRequestException({
        success: false,
        message: 'El correo electrónico ya está registrado',
        code: 409,
      });
    }
    const message =
      err instanceof Error
        ? err.message
        : 'Ocurrió un error, consulte a soporte';
    if (err instanceof Error) {
      this.logger.error(err.message, err.stack);
    } else {
      this.logger.error(err);
    }

    throw new BadRequestException({
      success: false,
      message,
      code: 500,
    });
  }
}
