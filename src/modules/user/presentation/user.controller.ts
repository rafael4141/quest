import { Body, Controller, Post, Res } from '@nestjs/common';
import { CreateUserUseCase } from '../application/usecases/create-user.usecase';
import { LoginUserUseCase } from '../application/usecases/login-user.usecase';
import { LoginDto } from './dtos/login.dto';
import type { Response } from 'express';
import { Public } from 'src/shared/guards/passport.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post()
  @Public()
  create(@Body() body: any) {
    return this.createUserUseCase.execute(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const tokens = await this.loginUserUseCase.execute(body);

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).send({ message: 'Login Successful!' });
  }
}
