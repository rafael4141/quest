import { UserEntity } from '../../domain/entities/user.entity';

export type CreateUserInput = UserEntity;

export abstract class UserRepositoryAbstract {
  abstract create(data: CreateUserInput): Promise<UserEntity>;
  abstract findOneByEmail(email: string): Promise<UserEntity>;
}
