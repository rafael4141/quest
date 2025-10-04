import { Body, Controller } from '@nestjs/common';
import { CreateUserUseCase } from '../application/create-user.usecase';
import { LoginUserUseCase } from '../application/login-user.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  create(@Body() body: any) {
    return this.createUserUseCase.execute(body);
  }

  login(@Body() body: any) {
    return this.loginUserUseCase.execute(body);
  }
}
