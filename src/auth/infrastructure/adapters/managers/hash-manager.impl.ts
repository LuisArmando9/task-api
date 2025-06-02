import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashManager } from 'src/auth/core/domain/managers/hash-manager';

@Injectable()
export class HashManagerImpl implements HashManager {
  private readonly saltRounds = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
