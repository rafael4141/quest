import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/infra/user.module';
import { QuestModule } from './modules/quest/infra/quest.module';

@Module({
  imports: [UserModule, QuestModule],
})
export class AppModule {}
