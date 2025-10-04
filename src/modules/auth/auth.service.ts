import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async generateJwt(payload: { id: string }) {
    console.log(
      this.configService.get('JWT_EXPIRES_IN'),
      this.configService.get('JWT_SECRET'),
    );

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: await this.configService.get('JWT_EXPIRES_IN'),
      secret: await this.configService.get('JWT_SECRET'),
    });

    return { accessToken };
  }
}
