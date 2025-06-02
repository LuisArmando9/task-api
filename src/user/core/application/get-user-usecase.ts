import { Injectable } from '@nestjs/common';
import {
  CreateUserUsecase,
  GetUserUsecase,
  UserValidatorUsecase,
} from '../domain/usecases/user-usecase';
import { UserModel } from '../domain/models/user-model';
import { UserRepository } from '../domain/repositories/user-repository';
import { UserNotFoundException } from '../domain/exceptions/user.exception';

@Injectable()
export class GetUserUsecaseImpl implements GetUserUsecase {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserByEmail(email: string): Promise<UserModel> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }
}
