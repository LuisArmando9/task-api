import { Module } from '@nestjs/common';
import { CreateUserUsecase, GetUserUsecase, UserValidatorUsecase } from './core/domain/usecases/user-usecase';
import { CreateUserCaseImp } from './core/application/create-user-usecase';
import { UserRepositoryImpl } from './infrastructure/adapters/persistence/firestore/repositories/user-repository-impl';
import { UserRepository } from './core/domain/repositories/user-repository';
import { GetUserUsecaseImpl } from './core/application/get-user-usecase';
import { UserValidatorUsecaseImpl } from './core/application/user-validator-usecase';
@Module({
  providers: [
    {
      provide: CreateUserUsecase,
      useClass: CreateUserCaseImp,
    },
    {
      provide:GetUserUsecase,
      useClass: GetUserUsecaseImpl
    },
    {
      provide: UserValidatorUsecase,
      useClass: UserValidatorUsecaseImpl
    },

    {
      provide: UserRepository,
      useClass: UserRepositoryImpl
    }
  ],
  exports:[CreateUserUsecase, GetUserUsecase, UserValidatorUsecase]
})
export class UserModule {}
