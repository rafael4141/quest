import { Injectable } from '@nestjs/common';
import { UserRepositoryAbstract } from './repositories/user.repository';
import { IUseCase } from 'src/contracts/usecase';
import { UserEntity } from '../domain/entities/user.entity';

export type CreateUserUseCaseInput = UserEntity;
export type CreateUserUseCaseOutput = UserEntity;

@Injectable()
export class CreateUserUseCase
  implements IUseCase<CreateUserUseCaseInput, CreateUserUseCaseOutput>
{
  constructor(private readonly useRepository: UserRepositoryAbstract) {}

  async execute(input: UserEntity): Promise<UserEntity> {
    return this.useRepository.create(input);
  }
}
