import { Controller, Get } from '@nestjs/common';
import { QuestRepositoryAbstract } from '../application/repositories/quest.repositoy';
import { Public } from 'src/shared/guards/passport.guard';

@Controller('quest')
export class QuestController {
  constructor(private readonly questRepository: QuestRepositoryAbstract) {}

  @Get('all-instances')
  @Public()
  async getAllInstances() {
    return this.questRepository.findInstances();
  }
}
