import { Controller, Get, Post } from '@nestjs/common';
import {
  CreateSprintResponseDto,
  GetNotCompleteSprintResponseDto,
} from './sprint.controller.dtos';
import { SprintService } from '../services/sprints/sprint.service';
import { Sprint } from '../entities/sprint.entity';
import { SprintTasksService } from 'src/services/sprint-tasks/sprint-tasks.service';

@Controller('sprint')
export class SprintsController {
  constructor(
    private service: SprintService,
    private sprintTasksService: SprintTasksService,
  ) {}

  /**
   * Creates a new sprint if there are no incomplete sprints.
   * @returns {Promise<CreateSprintResponseDto>} A promise that resolves with a stripped down version of the newly created sprint
   * @throws {BadRequestException} If there is an incomplete sprint.
   */
  @Post()
  async createSprint(): Promise<CreateSprintResponseDto> {
    const sprintCreated: Sprint = await this.service.createSprint();

    return {
      id: sprintCreated.id,
      sprintNumber: sprintCreated.sprint_number,
    };
  }

  @Get('not-complete')
  async getNonCompleteSprints(): Promise<GetNotCompleteSprintResponseDto[]> {
    const nonCompleteSprints = await this.service.getNonCompleteSprints();

    const response: GetNotCompleteSprintResponseDto[] = [];

    for (const sprint of nonCompleteSprints) {
      const responseItem: GetNotCompleteSprintResponseDto = {
        sprintId: sprint.id,
        sprintNumber: sprint.sprint_number,
        sprintDurationWeeks: sprint.sprint_duration_weeks,
        sprintStartDate: sprint.start_date,
        tasks: [],
      };

      const tasksOfSprint = await this.sprintTasksService.getTasksOfSprint(
        sprint.id,
      );

      for (const task of tasksOfSprint) {
        responseItem.tasks.push({
          description: task.description,
          id: task.id,
          label: task.label,
          name: task.name,
          points: task.points,
        });
      }

      response.push(responseItem);
    }

    return response;
  }

  /**
   * Retrieves the current sprint, i.e., the sprint that is not complete
   *
   * @returns {Promise<GetCurrentSprintResponseDto>} Promise that resolves to the current sprint.
   */
  // @Get('current')
  // async getCurrentSprint(): Promise<GetCurrentSprintResponseDto> {
  // const currentSprint: Sprint = await this.service.getCurrentSprint();
  // return {
  //   id: currentSprint.id,
  //   startDate: currentSprint.start_date,
  //   endDate: currentSprint.end_date,
  //   sprintNumber: currentSprint.sprint_number,
  // };
  // }
}
