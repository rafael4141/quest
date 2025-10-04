import { Module } from '@nestjs/common';
import { QuestService } from '../presentation/quest.service';
import { QuestController } from '../presentation/quest.controller';
import { QuestProducerAbstract } from '../application/events/quest.event';
import { QuestBullProducer } from './queues/quest-bull.event';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEST_QUEUE } from './queues/queues';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const url = configService.get('REDIS_URL') as string;
        return { url };
      },
    }),
    BullModule.registerQueue({ name: QUEST_QUEUE }),
  ],
  controllers: [QuestController],
  providers: [
    QuestService,
    { provide: QuestProducerAbstract, useClass: QuestBullProducer },
  ],
})
export class QuestModule {}
