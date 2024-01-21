import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from 'src/entities/sprint.entity';
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

  /**
   * Gets the task and the sprint in question
   * Check that the task is not complete
   * Assigns the task to the sprint
   * Saves the task
   * @param taskId
   * @param sprintId
   */
  async assignTaskToSprint(taskId: string, sprintId: string) {
    await this.dataSource.transaction(
      'REPEATABLE READ',
      async (transactionalEntityManager) => {
        // get the task in question
        const task = await transactionalEntityManager.findOne(Task, {
          where: { id: taskId },
        });

        if (!task) {
          Logger.error(
            `SprintTasksService | assignTaskToSprint: Task does not exist. Cannot assign task to sprint`,
          );
          throw new NotFoundException(
            `SprintTasksService | assignTaskToSprint: Task does not exist. Cannot assign task to sprint`,
          );
        }

        // In case we want to stop a user from assigning a completed task to a sprint
        // I have left it commented out because why stop them from doing this?
        // if (task.completed) {
        //   Logger.debug(
        //     `SprintTasksService | assignTaskToSprint: Task is complete. Cannot assign completed task to sprint`,
        //   );
        //   throw new BadRequestException(
        //     `SprintTasksService | assignTaskToSprint: Task is complete. Cannot assign completed task to sprint`,
        //   );
        // }

        // get the sprint in question
        const sprint = await transactionalEntityManager.findOne(Sprint, {
          where: { id: sprintId },
        });

        if (!sprint) {
          Logger.error(
            `SprintTasksService | assignTaskToSprint: Sprint does not exist. Cannot assign task to sprint`,
          );
          throw new NotFoundException(
            `SprintTasksService | assignTaskToSprint: Sprint does not exist. Cannot assign task to sprint`,
          );
        }

        // assign the task to the sprint
        task.sprint = sprint;
        task.assigned_to_sprint = Date.now();

        // save the task
        await transactionalEntityManager.save(task);
      },
    );
  }
}
