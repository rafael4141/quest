import { Module } from '@nestjs/common';
import { QuestService } from '../presentation/quest.service';
import { QuestController } from '../presentation/quest.controller';
import { QuestProducerAbstract } from '../application/events/quest.event';
import { QuestBullProducer } from './queues/quest-bull.event';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEST_QUEUE } from './queues/queues';
import { QuestBullProcessor } from './queues/quest-bull.processor';
import { QuestEngineUseCase } from '../application/usecases/quest-engine.usecase';
import { QuestRepositoryAbstract } from '../application/repositories/quest.repositoy';
import { QuestInMemoryRepository } from './repositories/quest-in-memory.repository';

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
    QuestEngineUseCase,
    { provide: QuestProducerAbstract, useClass: QuestBullProducer },
    QuestBullProcessor,
    { provide: QuestRepositoryAbstract, useClass: QuestInMemoryRepository },
  ],
  exports: [QuestService],
})
export class QuestModule {}
