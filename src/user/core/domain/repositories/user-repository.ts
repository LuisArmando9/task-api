import { UserModel } from '../models/user-model';

export abstract class UserRepository {
  abstract create(user: UserModel): Promise<UserModel>;
  abstract findByEmail(email: string): Promise<UserModel | null>;
  abstract existsByEmail(email: string): Promise<boolean>;
}
