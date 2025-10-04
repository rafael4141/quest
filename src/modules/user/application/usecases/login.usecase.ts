import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/contracts/usecase';
import { UserRepositoryAbstract } from '../repositories/user.repository';
import { AuthService } from 'src/modules/auth/auth.service';

export type LoginUseCaseInput = { email: string; password: string };
export type LoginUseCaseOutput = { userId: string; accessToken: string };

@Injectable()
export class LoginUseCase
  implements IUseCase<LoginUseCaseInput, LoginUseCaseOutput>
{
  constructor(
    private authService: AuthService,
    private userRepository: UserRepositoryAbstract,
  ) {}

  async execute(input: LoginUseCaseInput): Promise<LoginUseCaseOutput> {
    const user = await this.userRepository.findOneByEmail(input.email);

    const tokens = await this.authService.generateJwt({ id: user.id });

    return { ...tokens, userId: user.id };
  }
}
