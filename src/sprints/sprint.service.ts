import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from '../entities/sprint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
  ) {}

  /**
   * We do not care if a sprint already exists - let them create as many as they want
   * Better not to restrict them + they can delete them if they want
   * @returns the created sprint (will only have the sprint number filled out - everything else is generated either at the end of the sprint or at the beginning)
   */
  async createSprint(): Promise<Sprint> {
    // Get the sprint count
    const sprintCount = await this.sprintRepository.count();

    // generate the sprint number
    const sprintNumber = sprintCount + 1;

    // generate the new sprint
    const newSprint = new Sprint();
    newSprint.sprint_number = sprintNumber;

    // save the sprint
    return await this.sprintRepository.save(newSprint);
  }

  /**
   * Creates a new sprint if there are no incomplete sprints.
   * @returns {Promise<Sprint>} A promise that resolves with the newly created Sprint entity.
   * @throws {BadRequestException} If there is an incomplete sprint.
   */
  async createSprintOld(): Promise<Sprint> {
    // 1. Check if there is a sprint that is not complete
    const [notCompleteSprint, sprintCount] =
      await this.sprintRepository.findAndCount({
        // where: {
        //   complete: IsNull(),
        // },
      });

    if (notCompleteSprint.length > 0) {
      Logger.warn(
        `SprintService | createSprint - Client is trying to create new sprint when one is still not complete`,
      );
      throw new BadRequestException(
        `SprintService | createSprint - Client is trying to create new sprint when one is still not complete`,
      );
    }

    // 2. All is good, create the new sprint
    // generate the sprint number
    const sprintNumber: number = sprintCount + 1;

    // create the sprint
    const sprintToSave: Sprint = await this.sprintRepository.create({
      sprint_number: sprintNumber,
    });

    // save the sprint
    return await this.sprintRepository.save(sprintToSave);
  }

  /**
   * Retrieves the current sprint, i.e., the sprint that is not complete
   *
   * @returns {Promise<Sprint>} Promise that resolves to the current sprint.
   */
  // async getCurrentSprint(): Promise<Sprint> {
  //   return await this.sprintRepository.findOne({
  //     order: {
  //       sprint_number: 'DESC', // Order by sprint number in descending order to get the highest number first. This is in the odd case that there would be 2 current sprints, we want to returns the latest one
  //     },
  //     where: {
  //       complete: IsNull(), // Only retrieve sprints that are not complete.
  //     },
  //   });
  // }
}
