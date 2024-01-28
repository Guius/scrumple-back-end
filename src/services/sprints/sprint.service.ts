import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from '../../entities/sprint.entity';
import { DataSource, IsNull, Repository } from 'typeorm';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
    private dataSource: DataSource,
  ) {}

  /**
   * We do not care if a sprint already exists - let them create as many as they want
   * Better not to restrict them + they can delete them if they want
   * @returns the created sprint (will only have the sprint number filled out - everything else is generated either at the end of the sprint or at the beginning)
   */
  async createSprint(): Promise<Sprint> {
    let result: Sprint;
    await this.dataSource.manager.transaction(
      'REPEATABLE READ',
      async (transactionalEntityManager) => {
        const sprintCount = await transactionalEntityManager.count(Sprint);
        const sprintNumber = sprintCount + 1;
        const newSprint = new Sprint();
        newSprint.sprint_number = sprintNumber;
        result = await transactionalEntityManager.save(newSprint);
      },
    );

    return result;
  }

  async getNonCompleteSprints(): Promise<Sprint[]> {
    return await this.sprintRepository.find({
      where: {
        end_date: IsNull(), // Only retrieve sprints that are not complete.
      },
    });
  }
}
