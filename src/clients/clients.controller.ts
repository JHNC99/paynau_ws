import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('clients')
@Controller('clients')
@UsePipes(ValidationPipe)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({ status: 201, description: 'Cliente creado correctamente.' })
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Listado de clientes.',
  })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Detalle de un cliente.',
  })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: 200,
    description: 'Cliente actualizado correctamente.',
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cliente eliminado correctamente.' })
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
