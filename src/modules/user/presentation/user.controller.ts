import { Body, Controller, Post, Res } from '@nestjs/common';
import { RegisterUseCase } from '../application/usecases/register.usecase';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { LoginDto } from './dtos/login.dto';
import type { Response } from 'express';
import { Public } from 'src/shared/guards/passport.guard';
import { RegisterDto } from './dtos/register.dto';
import { QuestService } from 'src/modules/quest/presentation/quest.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly questService: QuestService,
  ) {}

  @Public()
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.registerUseCase.execute(body);
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto, @Res() res: Response) {
    const result = await this.loginUseCase.execute(body);

    await this.questService.loginEvent(result.userId);

    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).send({ message: 'Login Successful!' });
  }
}
