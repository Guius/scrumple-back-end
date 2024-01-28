import { Controller } from '@nestjs/common';
import { SprintTasksService } from 'src/services/sprint-tasks/sprint-tasks.service';

@Controller('sprint-tasks')
export class SprintTasksController {
  constructor(private readonly service: SprintTasksService) {}
}
