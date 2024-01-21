import { Controller, Param, Patch } from '@nestjs/common';
import { SprintTasksService } from 'src/services/sprint-tasks/sprint-tasks.service';

@Controller('sprint-tasks')
export class SprintTasksController {
  constructor(private readonly service: SprintTasksService) {}

  @Patch('assign-task-to-sprint/:taskId/:sprintId')
  async assignTaskToSprint(
    @Param('taskId') taskId: string,
    @Param('sprintId') sprintId: string,
  ) {
    return await this.service.assignTaskToSprint(taskId, sprintId);
  }
}
