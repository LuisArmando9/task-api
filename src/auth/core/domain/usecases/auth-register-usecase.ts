import { PublicUserModel, UserModel } from "src/user/core/domain/models/user-model";

export abstract class AuthRegisterUsecase {
    abstract register(user: UserModel): Promise<PublicUserModel>;

}