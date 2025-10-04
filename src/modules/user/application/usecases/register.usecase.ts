import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepositoryAbstract } from '../repositories/user.repository';
import { IUseCase } from 'src/contracts/usecase';
import { UserEntity } from '../../domain/entities/user.entity';
import { HasherServiceAbstract } from '../security/hasher.service';

export type RegisterUseCaseInput = Omit<UserEntity, 'id'> & {
  confirmPassword: string;
};
export type RegisterUseCaseOutput = UserEntity;

@Injectable()
export class RegisterUseCase
  implements IUseCase<RegisterUseCaseInput, RegisterUseCaseOutput>
{
  constructor(
    private hasherService: HasherServiceAbstract,
    private useRepository: UserRepositoryAbstract,
  ) {}

  async execute(input: RegisterUseCaseInput): Promise<RegisterUseCaseOutput> {
    const hasUser = await this.useRepository.findOneByEmail(input.email);

    if (input.password !== input.confirmPassword) {
      throw new UnauthorizedException(
        'Password is different of cofirmPassword',
      );
    }

    if (hasUser) {
      throw new UnauthorizedException('Email in using');
    }

    input.password = await this.hasherService.hash(input.password);

    return this.useRepository.create({
      email: input.email,
      password: input.password,
    });
  }
}
