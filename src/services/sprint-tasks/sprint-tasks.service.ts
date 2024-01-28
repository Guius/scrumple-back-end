import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/entities/tasks.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SprintTasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private dataSource: DataSource,
  ) {}

  async getTasksOfSprint(sprintId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['sprint'],
      where: {
        sprint: {
          id: sprintId,
        },
      },
    });
  }
}
