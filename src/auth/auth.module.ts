import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './infrastructure/adapters/controllers/auth.controller';
import { HashManagerImpl } from './infrastructure/adapters/managers/hash-manager.impl';
import { HashManager } from './core/domain/managers/hash-manager';
import { randomBytes } from 'crypto';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './infrastructure/adapters/jwt/jwt-strategy';
import { AuthLoginUsecaseImpl } from './core/application/auth-login-usecase.impl';
import { AuthRegisterUsecaseImpl } from './core/application/auth-register-usecase.impl';
import { AuthLoginUsecase } from './core/domain/usecases/auth-login-usecase';
import { AuthRegisterUsecase } from './core/domain/usecases/auth-register-usecase';
import { EnumFirebaseFunctionVersion, FirebaseHttps } from 'nestfire';

const jwtSecret = randomBytes(64).toString('hex');

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '3600s',
        },
      }),
    }),
  ],
  controllers: [AuthController, ],
  providers: [
    {
      provide: HashManager,
      useClass: HashManagerImpl,
    },
    {
        provide: AuthRegisterUsecase,
        useClass: AuthRegisterUsecaseImpl
    },
    {
        provide: AuthLoginUsecase,
        useClass: AuthLoginUsecaseImpl
    },
    JwtStrategy
  ],
  exports: [AuthRegisterUsecase, AuthLoginUsecase],
})
export class AuthModule {}
