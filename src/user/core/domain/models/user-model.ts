export class UserModel {
  id!: string;
  name!: string;
  email!: string;
  password?: string;
  createdAt!: Date;

  toPublic(): PublicUserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    };
  }

  toJson(): Record<string, string | Date> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password as string,
      createdAt: this.createdAt ?? new Date(),
    };
  }
}
export type PublicUserModel = Omit<
  UserModel,
  'password' | 'toPublic' | 'toJson'
>;
