import { Module } from '@nestjs/common';
import { UserController } from '../presentation/user.controller';
import { UserRepositoryAbstract } from '../application/repositories/user.repository';
import { UserInMemoryRepository } from './repositories/user-in-memory.repository';
import { RegisterUseCase } from '../application/usecases/register.usecase';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { AuthModule } from 'src/modules/auth/auth.module';
import { HasherServiceAbstract } from '../application/security/hasher.service';
import { ArgonHasherService } from './security/argon-hasher.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    { provide: UserRepositoryAbstract, useClass: UserInMemoryRepository },
    { provide: HasherServiceAbstract, useClass: ArgonHasherService },
  ],
})
export class UserModule {}
