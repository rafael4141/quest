import { IUseCase } from 'src/contracts/usecase';
import { QuestEvent } from '../events/quest.event';
import { QuestRepositoryAbstract } from '../repositories/quest.repository';
import {
  QuestInstance,
  QuestStatus,
  Requirement,
} from '../../domain/entities/quest.entity';
import { Injectable } from '@nestjs/common';

export type QuestEngineUseCaseInput = QuestEvent;
export type QuestEngineUseCaseOutput = void;

@Injectable()
export class QuestEngineUseCase
  implements IUseCase<QuestEngineUseCaseInput, QuestEngineUseCaseOutput>
{
  constructor(private questRepository: QuestRepositoryAbstract) {}

  async execute(
    event: QuestEngineUseCaseInput,
  ): Promise<QuestEngineUseCaseOutput> {
    const questsAvailables = await this.questRepository.findQuestsAvailables();

    let activeQuests = await this.questRepository.findActiveByUserId(
      event.userId,
    );

    for (const quest of questsAvailables) {
      const hasUserThisQuest = activeQuests.find((q) => q.questId === quest.id);
      if (hasUserThisQuest) continue;
      await this.createQuestInstance(event.userId, quest.id);
    }

    // REFATORAR ISSO AQUI PELO AMOR DE DEUS
    activeQuests = await this.questRepository.findActiveByUserId(event.userId);

    for (const quest of activeQuests) {
      const updateQuestProgress = this.updateQuestProgress(quest, event);
      await this.questRepository.updateQuestProgress(updateQuestProgress);
    }
  }

  async createQuestInstance(userId: string, questId: string) {
    await this.questRepository.createInstance({
      playerId: userId,
      progress: {},
      questId,
      startedAt: new Date(),
      status: QuestStatus.IN_PROGRESS,
    });
  }

  updateQuestProgress(
    quest: QuestInstance & { requirements: Requirement[] },
    event: QuestEvent,
  ): QuestInstance {
    if (quest.status !== QuestStatus.IN_PROGRESS) return quest;

    for (const req of quest.requirements) {
      if (req.type !== event.type) continue;

      let progress = quest.progress[req.id];

      if (!progress) {
        quest.progress[req.id] = 1;
        continue;
      }

      progress += 1;
    }

    const completed = this.isQuestComplete(quest);
    if (completed) {
      quest.status = QuestStatus.COMPLETED;
      quest.completedAt = new Date();
    }

    return quest;
  }

  private isQuestComplete(
    quest: QuestInstance & { requirements: Requirement[] },
  ): boolean {
    for (const reqId in quest.progress) {
      const requirement = quest.requirements.find((r) => r.id === reqId)!;

      const reqProgress = quest.progress[reqId];

      if (reqProgress < requirement.target) {
        return false;
      }
    }

    return true;
  }
}
