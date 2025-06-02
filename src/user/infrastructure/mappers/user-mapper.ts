import { firestore } from 'firebase-admin';
import { UserModel } from 'src/user/core/domain/models/user-model';

export class UserMapper {
  static toDomain(document: firestore.DocumentData): UserModel {
    return Object.assign(new UserModel(), document);
  }
}
