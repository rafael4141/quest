import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/contracts/usecase';
import { UserRepositoryAbstract } from '../repositories/user.repository';
import { AuthService } from 'src/modules/auth/auth.service';

export type LoginUserUseCaseInput = { email: string; password: string };
export type LoginUserUseCaseOutput = { accessToken: string };

@Injectable()
export class LoginUserUseCase
  implements IUseCase<LoginUserUseCaseInput, LoginUserUseCaseOutput>
{
  constructor(
    private authService: AuthService,
    private userRepository: UserRepositoryAbstract,
  ) {}

  async execute(input: LoginUserUseCaseInput): Promise<LoginUserUseCaseOutput> {
    const user = await this.userRepository.findOneByEmail(input.email);

    return this.authService.generateJwt({ id: user.id });
  }
}
