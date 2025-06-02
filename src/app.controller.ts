import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDTO } from './auth/infrastructure/adapters/dto/create-user.dto';
import { LoginUserDTO } from './auth/infrastructure/adapters/dto/login-user.dto';
import { AuthLoginUsecase } from './auth/core/domain/usecases/auth-login-usecase';
import { AuthRegisterUsecase } from './auth/core/domain/usecases/auth-register-usecase';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authRegister: AuthRegisterUsecase,
    private readonly authLogin: AuthLoginUsecase,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth-register')
  register(@Body() createUserDto: CreateUserDTO) {
    return this.authRegister.register(createUserDto.toDomain());
  }

  @Post('auth-login')
  login(@Body() loginUserDto: LoginUserDTO) {
    return this.authLogin.login(loginUserDto.email, loginUserDto.password);
  }
}
