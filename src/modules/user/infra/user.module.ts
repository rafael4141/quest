import { Module } from '@nestjs/common';
import { UserController } from '../presentation/user.controller';
import { UserRepositoryAbstract } from '../application/repositories/user.repository';
import { UserInMemoryRepository } from './repositories/user-in-memory.repository';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { LoginUserUseCase } from '../application/login-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    LoginUserUseCase,
    { provide: UserRepositoryAbstract, useClass: UserInMemoryRepository },
  ],
})
export class UserModule {}
