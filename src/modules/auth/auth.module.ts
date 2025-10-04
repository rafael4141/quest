import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { PassportGuard } from 'src/shared/guards/passport.guard';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: PassportGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
