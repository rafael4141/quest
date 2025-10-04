import { QuestRepositoryAbstract } from '../../application/repositories/quest.repositoy';
import {
  QuestDefinition,
  QuestInstance,
  Requirement,
  Reward,
} from '../../domain/entities/quest.entity';

export class QuestInMemoryRepository implements QuestRepositoryAbstract {
  private questInstances: QuestInstance[] = [];
  private questDefinitions: QuestDefinition[] = [];
  private questRequeriments: Requirement[] = [];
  private questRewards: Reward[] = [];

  async findActiveByUserId(
    userId: string,
  ): Promise<(QuestInstance & { requirements: Requirement[] })[]> {
    const userQuests = this.questInstances
      .filter((instance) => instance.playerId === userId)
      .map((instance) => ({
        ...instance,
        requirements: this.questRequeriments.filter(
          (requeriment) => requeriment.questId === instance.questId,
        ),
      }));

    return userQuests;
  }

  async updateQuestProgress(quest: QuestInstance): Promise<QuestInstance> {
    const questIndex = this.questInstances.findIndex(
      (instance) => instance.id === quest.id,
    );

    if (questIndex !== -1) {
      this.questInstances[questIndex] = quest;
    }

    return quest;
  }
}
