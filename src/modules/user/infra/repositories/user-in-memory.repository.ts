import { UnauthorizedException } from '@nestjs/common';
import {
  CreateUserInput,
  UserRepositoryAbstract,
} from '../../application/repositories/user.repository';
import { UserEntity } from '../../domain/entities/user.entity';

export class UserInMemoryRepository implements UserRepositoryAbstract {
  private users = new Map<string, UserEntity>();

  async create(data: CreateUserInput): Promise<UserEntity> {
    const length = String([this.users.keys()].length);
    this.users.set(length, data);

    return this.users.get(length)!;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = this.users.get(email);

    if (!user) throw new UnauthorizedException('User not exists');

    return user;
  }
}
