import { Injectable } from '@nestjs/common';
import { QuestProducerAbstract } from '../application/events/quest.event';
import { QuestType } from '../domain/entities/quest.entity';

@Injectable()
export class QuestService {
  constructor(private readonly questProducer: QuestProducerAbstract) {}

  async loginEvent(userId: string) {
    await this.questProducer.publish({
      type: QuestType.LOGIN,
      userId,
    });
  }
}
