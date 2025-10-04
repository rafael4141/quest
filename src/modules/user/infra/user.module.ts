import { Module } from '@nestjs/common';
import { UserController } from '../presentation/user.controller';
import { UserRepositoryAbstract } from '../application/repositories/user.repository';
import { UserInMemoryRepository } from './repositories/user-in-memory.repository';
import { CreateUserUseCase } from '../application/create-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    { provide: UserRepositoryAbstract, useClass: UserInMemoryRepository },
  ],
})
export class UserModule {}
