import { UnauthorizedException } from '@nestjs/common';
import {
  CreateUserInput,
  UserRepositoryAbstract,
} from '../../application/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserInMemoryRepository implements UserRepositoryAbstract {
  private users: UserEntity[] = [
    {
      id: '0',
      email: 'rafael@email.com',
      password: 'password',
    },
  ];

  async create(data: CreateUserInput): Promise<UserEntity> {
    const length = String([this.users.keys()].length);
    this.users.push({ ...data, id: length });

    return this.users.find((user) => user.id === length)!;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.email === email);

    if (!user) throw new UnauthorizedException('User not exists');

    return user;
  }
}
