import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
  ) {}

  async createSprint(): Promise<Sprint> {
    // 1. Check if there is a sprint that is not complete
    let notCompleteSprint: Sprint[];
    let sprintCount: number;
    [notCompleteSprint, sprintCount] = await this.sprintRepository.findAndCount(
      {
        where: {
          complete: IsNull(),
        },
      },
    );

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
}
