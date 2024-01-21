import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from 'src/entities/sprint.entity';
import { Task } from 'src/entities/tasks.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SprintTasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Sprint) private sprintRepository: Repository<Sprint>,
    private dataSource: DataSource,
  ) {}

  async getTasksOfSprint(sprintId: string): Promise<Task[]> {
    return await this.taskRepository.find({ where: { id: sprintId } });
  }

  /**
   * Gets the task and the sprint in question
   * Assigns the task to the sprint
   * Saves the task
   * @param taskId
   * @param sprintId
   */
  async assignTaskToSprint(taskId: string, sprintId: string) {
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      // get the sprint in question
      const sprint = await transactionalEntityManager.findOne(Sprint, {
        where: { id: sprintId },
      });

      // get the task in question
      const task = await transactionalEntityManager.findOne(Task, {
        where: { id: taskId },
      });

      // assign the task to the sprint
      task.sprint = sprint;
      task.assigned_to_sprint = Date.now();

      // save the task
      await transactionalEntityManager.save(task);
    });
  }
}
