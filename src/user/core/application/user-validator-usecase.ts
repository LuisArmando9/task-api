import { Injectable } from "@nestjs/common";
import { UserValidatorUsecase } from "../domain/usecases/user-usecase";
import { UserRepository } from "../domain/repositories/user-repository";
import { UserEmailAlreadyExistsException } from "../domain/exceptions/user.exception";

@Injectable()
export class UserValidatorUsecaseImpl implements UserValidatorUsecase {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async validateForCreate(email: string): Promise<void> {
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            throw new UserEmailAlreadyExistsException();
        }
    }
}
