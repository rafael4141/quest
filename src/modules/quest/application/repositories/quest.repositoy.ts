import {
  QuestDefinition,
  QuestInstance,
  Requirement,
} from '../../domain/entities/quest.entity';

export abstract class QuestRepositoryAbstract {
  abstract findActiveByUserId(
    userId: string,
  ): Promise<(QuestInstance & { requirements: Requirement[] })[]>;
  abstract updateQuestProgress(quest: QuestInstance): Promise<QuestInstance>;
  abstract findInstances(): Promise<QuestInstance[]>;
  abstract findQuestsAvailables(): Promise<QuestDefinition[]>;
  abstract createInstance(input: Omit<QuestInstance, 'id'>): Promise<void>;
}
