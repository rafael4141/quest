import { QuestType } from '../../domain/entities/quest.entity';

export interface QuestEvent {
  type: QuestType;
  userId: string;
}

export abstract class QuestProducerAbstract {
  abstract publish(event: QuestEvent): Promise<void>;
}
