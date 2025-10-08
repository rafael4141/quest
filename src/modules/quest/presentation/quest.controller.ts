import { Controller, Get } from '@nestjs/common';
import { QuestRepositoryAbstract } from '../application/repositories/quest.repository';
import { CurrentUser, Public } from 'src/shared/guards/passport.guard';

@Controller('quest')
export class QuestController {
  constructor(private readonly questRepository: QuestRepositoryAbstract) {}

  @Get('all-instances')
  @Public()
  async getAllInstances() {
    return this.questRepository.findInstances();
  }

  @Get('my')
  async getMyQuests(@CurrentUser() user: { id: string }) {
    return this.questRepository.findActiveByUserId(user.id);
  }
}
