import { PublicUserModel, UserModel } from 'src/user/core/domain/models/user-model';
import { AuthRegisterUsecase } from '../domain/usecases/auth-register-usecase';
import { Injectable } from '@nestjs/common';
import {
  CreateUserUsecase,
  UserValidatorUsecase,
} from 'src/user/core/domain/usecases/user-usecase';
import { HashManager } from '../domain/managers/hash-manager';

@Injectable()
export class AuthRegisterUsecaseImpl implements AuthRegisterUsecase {
  constructor(
    private readonly createUserUseCase: CreateUserUsecase,
    private readonly userValidator: UserValidatorUsecase,
    private readonly hashManager: HashManager,
  ) {}

  async register(user: UserModel): Promise<PublicUserModel> {
    await this.userValidator.validateForCreate(user.email);
    if (user.password) {
      user.password = await this.hashManager.hash(user.password);
    }
    return (await this.createUserUseCase.create(user)).toPublic();
  }
}
