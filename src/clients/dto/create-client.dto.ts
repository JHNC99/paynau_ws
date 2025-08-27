import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsInt,
} from 'class-validator';
export class CreateClientDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  first_name: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  last_name: string;

  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDateString()
  birth_date?: string;

  @IsInt({ message: 'El género debe ser un número entero' })
  gender_id: number;

  @IsOptional()
  @IsString()
  address?: string;
}
