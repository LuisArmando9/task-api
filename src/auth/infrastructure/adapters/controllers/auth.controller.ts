import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/create-user.dto';
import { CreateUserUsecase } from 'src/user/core/domain/usecases/user-usecase';
import { AuthLoginUsecase } from 'src/auth/core/domain/usecases/auth-login-usecase';
import { AuthRegisterUsecase } from 'src/auth/core/domain/usecases/auth-register-usecase';
import { LoginUserDTO } from '../dto/login-user.dto';

@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authRegister: AuthRegisterUsecase, private readonly authLogin: AuthLoginUsecase) {}

  @Post('register')
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado exitosamente' })
  register(@Body() createUserDto: CreateUserDTO) {
    return this.authRegister.register(createUserDto.toDomain());
  }

  @Post('login')
  @ApiOperation({ summary: 'Crea un nuevo token de acceso' })
  @ApiResponse({ status: 201, description: 'Genera un nuevo token de acceso' })
  login(@Body() loginUserDto: LoginUserDTO) {
    return this.authLogin.login(loginUserDto.email, loginUserDto.password)
  }
}
