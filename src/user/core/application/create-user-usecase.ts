import { Injectable } from "@nestjs/common";
import { CreateUserUsecase, UserValidatorUsecase } from "../domain/usecases/user-usecase";
import { UserModel } from "../domain/models/user-model";
import { UserRepository } from "../domain/repositories/user-repository";

@Injectable()
export class CreateUserCaseImp implements CreateUserUsecase {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userValidatorUsecase: UserValidatorUsecase,
    ) {}

    async create(user: UserModel): Promise<UserModel> {
        await this.userValidatorUsecase.validateForCreate(user.email);
        return this.userRepository.create(user);
    }
}