import { UserModel } from "../models/user-model";

export abstract class CreateUserUsecase {
    abstract create(user: UserModel): Promise<UserModel>;
}

export abstract class GetUserUsecase {
    abstract getUserByEmail(email: string): Promise<UserModel>;
}

export abstract class UserValidatorUsecase {
    abstract validateForCreate(email: string): Promise<void>;
}
