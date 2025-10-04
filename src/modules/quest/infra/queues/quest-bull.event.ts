import type { Queue } from 'bull';
import {
  QuestEvent,
  QuestProducerAbstract,
} from '../../application/events/quest.event';
import { InjectQueue } from '@nestjs/bull';
import { QUEST_QUEUE } from './queues';

export class QuestBullProducer implements QuestProducerAbstract {
  constructor(@InjectQueue(QUEST_QUEUE) private readonly queue: Queue) {}

  async publish(event: QuestEvent): Promise<void> {
    await this.queue.add(event, {
      attempts: 3,
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
