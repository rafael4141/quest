import { QuestInstance, Requirement } from '../../domain/entities/quest.entity';

export abstract class QuestRepositoryAbstract {
  abstract findActiveByUserId(
    userId: string,
  ): Promise<(QuestInstance & { requirements: Requirement[] })[]>;
  abstract updateQuestProgress(quest: QuestInstance): Promise<QuestInstance>;
}
