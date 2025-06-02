import { Injectable } from '@nestjs/common';
import { UserToken } from '../domain/models/user-payload';
import { AuthLoginUsecase } from '../domain/usecases/auth-login-usecase';
import { JwtService } from '@nestjs/jwt';
import { GetUserUsecase } from 'src/user/core/domain/usecases/user-usecase';
import { HashManager } from '../domain/managers/hash-manager';
import { InvalidCredentialsException } from '../domain/exceptions/auth-exception';

@Injectable()
export class AuthLoginUsecaseImpl implements AuthLoginUsecase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getUserUsecase: GetUserUsecase,
    private readonly hashManager: HashManager,
  ) {}

  async login(email: string, password: string): Promise<UserToken> {
    const user = await this.getUserUsecase.getUserByEmail(email);

    const isPasswordValid = await this.hashManager.compare(
      password,
      user.password as string,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
        email: user.email,
      }),
    };
  }
}
