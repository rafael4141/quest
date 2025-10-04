import { Process, Processor } from '@nestjs/bull';
import { QUEST_QUEUE } from './queues';
import { QuestEngineUseCase } from '../../application/usecases/quest-engine.usecase';
import type { QuestEvent } from '../../application/events/quest.event';

@Processor(QUEST_QUEUE)
export class QuestBullProcessor {
  constructor(private readonly questEngineUseCase: QuestEngineUseCase) {}

  @Process({ concurrency: 2 })
  async process(event: QuestEvent) {
    try {
      await this.questEngineUseCase.execute(event);
      return true;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
