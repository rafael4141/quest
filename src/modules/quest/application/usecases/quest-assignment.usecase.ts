import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/contracts/usecase';
import { QuestRepositoryAbstract } from '../repositories/quest.repository';
import { QuestStatus } from '../../domain/entities/quest.entity';

export type QuestAssignmentUseCaseInput = { userId: string };
export type QuestAssignmentUseCaseOutput = void;

@Injectable()
export class QuestAssignmentUseCase
  implements IUseCase<QuestAssignmentUseCaseInput, QuestAssignmentUseCaseOutput>
{
  constructor(private questRepository: QuestRepositoryAbstract) {}

  async execute(
    input: QuestAssignmentUseCaseInput,
  ): Promise<QuestAssignmentUseCaseOutput> {
    const todayQuests = await this.questRepository.findQuestsAvailables();
    const existing = await this.questRepository.findActiveByUserId(
      input.userId,
    );

    const newQuests = todayQuests.filter(
      (q) => !existing.some((eq) => eq.questId === q.id),
    );

    for (const quest of newQuests) {
      await this.questRepository.createInstance({
        playerId: input.userId,
        questId: quest.id,
        status: QuestStatus.IN_PROGRESS,
        progress: {},
        startedAt: new Date(),
      });
    }
  }
}
