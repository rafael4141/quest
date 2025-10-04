import { IUseCase } from 'src/contracts/usecase';
import { QuestEvent } from '../events/quest.event';
import { QuestRepositoryAbstract } from '../repositories/quest.repositoy';
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
    const activeQuests = await this.questRepository.findActiveByUserId(
      event.userId,
    );

    for (const quest of activeQuests) {
      const updateQuestProgress = this.updateQuestProgress(quest, event);
      await this.questRepository.updateQuestProgress(updateQuestProgress);
    }
  }

  updateQuestProgress(
    quest: QuestInstance & { requirements: Requirement[] },
    event: QuestEvent,
  ): QuestInstance {
    if (quest.status !== QuestStatus.IN_PROGRESS) return quest;

    for (const reqId in quest.progress) {
      const requirement = quest.requirements.find((r) => r.id === reqId)!;

      if (requirement.type === event.type) {
        quest.progress[reqId] += 1;
      }
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
