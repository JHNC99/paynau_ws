import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';
export class CreateClientDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  first_name: string;

  @ApiProperty({ description: 'Apellido del cliente' })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  last_name: string;

  @ApiProperty({ description: 'Correo electrónico del cliente' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @ApiProperty({ description: 'Teléfono del cliente' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Fecha de nacimiento del cliente' })
  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @ApiProperty({ description: 'ID del género del cliente' })
  @IsInt({ message: 'El género debe ser un número entero' })
  gender_id: number;

  @ApiProperty({ description: 'Dirección del cliente' })
  @IsOptional()
  @IsString()
  address?: string;
}
