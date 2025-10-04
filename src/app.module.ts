import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/infra/user.module';
import { QuestModule } from './modules/quest/infra/quest.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, QuestModule],
})
export class AppModule {}
