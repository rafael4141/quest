import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/infra/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
