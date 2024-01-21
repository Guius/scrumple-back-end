import { Controller, Post } from '@nestjs/common';
import { CreateSprintResponseDto } from './sprint.controller.dtos';
import { SprintService } from './sprint.service';
import { Sprint } from '../entities/sprint.entity';

@Controller('sprint')
export class SprintsController {
  constructor(private service: SprintService) {}

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
