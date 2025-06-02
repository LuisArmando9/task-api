import { UserModel } from "src/user/core/domain/models/user-model";

import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString({ message: 'El nombre debe ser un texto' })
  name!: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico válido',
  })
  @IsEmail({}, { message: 'El correo no es válido' })
  email!: string;

  @ApiProperty({
    example: 'secreto123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsString({ message: 'La contraseña debe ser un texto' })
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  password!: string;

  toDomain(): UserModel {
    return Object.assign(new UserModel(), this);
  }
}

