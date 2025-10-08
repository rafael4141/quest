import { QuestRepositoryAbstract } from '../../application/repositories/quest.repositoy';
import {
  QuestDefinition,
  QuestInstance,
  QuestType,
  Requirement,
} from '../../domain/entities/quest.entity';

export class QuestInMemoryRepository implements QuestRepositoryAbstract {
  private questInstances: QuestInstance[] = [];
  private questDefinitions: QuestDefinition[] = [
    {
      id: '0',
      name: 'quest login 1',
      description: 'login diário',
      requirements: [
        {
          id: '0',
          questId: '0',
          target: 1,
          type: QuestType.LOGIN,
        },
      ],
      rewards: [],
      availableFrom: new Date(),
      availableTo: new Date(),
    },
  ];

  async findActiveByUserId(
    userId: string,
  ): Promise<(QuestInstance & { requirements: Requirement[] })[]> {
    const userQuests = this.questInstances
      .filter((instance) => instance.playerId === userId)
      .map((instance) => {
        const requirements = this.questDefinitions.find(
          (definition) => definition.id === instance.questId,
        )?.requirements;

        return { ...instance, requirements: requirements ?? [] };
      });

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

  async findInstances(): Promise<QuestInstance[]> {
    return this.questInstances;
  }

  async createInstance(input: Omit<QuestInstance, 'id'>): Promise<void> {
    const id = String(this.questInstances.length);
    this.questInstances.push({ ...input, id });
  }

  async findQuestsAvailables(): Promise<QuestDefinition[]> {
    return this.questDefinitions;
  }
}
