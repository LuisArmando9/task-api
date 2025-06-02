import { UserToken } from "../models/user-payload";

export abstract class AuthLoginUsecase {
    abstract login(email: string, password:string): Promise<UserToken>
}