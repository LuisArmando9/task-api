import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import { InjectDatabase } from 'src/core/config/db/firestore-config.db';
import { UserModel } from 'src/user/core/domain/models/user-model';
import { UserRepository } from 'src/user/core/domain/repositories/user-repository';
import { UserMapper } from 'src/user/infrastructure/mappers/user-mapper';
import { v4 } from 'uuid';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  private readonly collection = 'users';
  private readonly collectionRef: firestore.CollectionReference<firestore.DocumentData>;

  constructor(
    @InjectDatabase() private readonly database: firestore.Firestore,
  ) {
    this.collectionRef = database.collection(this.collection);
  }

  async create(user: UserModel): Promise<UserModel> {
    user.id = v4();
    const userRef = this.collectionRef.doc(user.id);

    await userRef.set(user.toJson());
    return user;
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const snapshot = await this.collectionRef
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return null;
    }

    const [doc] = snapshot.docs;
    return UserMapper.toDomain(doc.data());
  }

  async existsByEmail(email: string): Promise<boolean> {
    const snapshot = await this.collectionRef
      .where('email', '==', email)
      .limit(1)
      .get();
      return !snapshot.empty;
  }
}
