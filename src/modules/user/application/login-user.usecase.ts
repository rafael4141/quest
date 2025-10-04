import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/contracts/usecase';
import { UserRepositoryAbstract } from './repositories/user.repository';

export type LoginUserUseCaseInput = { email: string; password: string };
export type LoginUserUseCaseOutput = any;

@Injectable()
export class LoginUserUseCase
  implements IUseCase<LoginUserUseCaseInput, LoginUserUseCaseOutput>
{
  constructor(private userRepository: UserRepositoryAbstract) {}

  async execute(input: LoginUserUseCaseInput): Promise<LoginUserUseCaseOutput> {
    const user = this.userRepository.findOneByEmail(input.email);

    return user;
  }
}
