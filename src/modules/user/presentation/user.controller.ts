import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUseCase } from '../application/usecases/register.usecase';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { LoginDto } from './dtos/login.dto';
import type { Response } from 'express';
import { Public } from 'src/shared/guards/passport.guard';
import { RegisterDto } from './dtos/register.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Public()
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.registerUseCase.execute(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const tokens = await this.loginUseCase.execute(body);

    res.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).send({ message: 'Login Successful!' });
  }
}
