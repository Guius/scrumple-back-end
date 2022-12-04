import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, IsNull, Like, Repository } from 'typeorm';
import {
  CreateBacklogItemRequestDto,
  BacklogItemResponseDto,
} from '../dtos/create-task.dto';
import { EditBacklogItemRequestDto } from '../dtos/edit-task.dto';
import { Task } from '../entities/tasks.entity';

@Injectable()
export class BacklogService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  async createBacklogItem(
    createTaskRequestDto: CreateBacklogItemRequestDto,
  ): Promise<BacklogItemResponseDto> {
    const task: Task = await this.taskRepository.create(createTaskRequestDto);
    const savedTask: Task = await this.taskRepository.save(task);
    const returnedTask: BacklogItemResponseDto = {
      id: savedTask.id,
      name: savedTask.name,
      description: savedTask.description,
      label: savedTask.label,
      points: savedTask.points,
    };

    return returnedTask;
  }

  async getAllBacklogItems(
    label?: string,
    name?: string,
    points?: number,
  ): Promise<BacklogItemResponseDto[]> {
    // 1. Organise query
    const queryParams: FindManyOptions = {
      where: {
        completed: IsNull(),
        assigned_to_sprint: IsNull(),
      },
      order: { label: 'DESC' },
    };

    if (label) queryParams.where['label'] = Like(`%${label}%`);
    if (name) queryParams.where['name'] = Like(`%${name}%`);
    if (points) queryParams.where['points'] = points;

    // 2. Get all the tasks
    const tasks: Task[] = await this.taskRepository.find(queryParams);

    // 3. Map tasks returned to dtos
    const returnedTasks: BacklogItemResponseDto[] = tasks.map((task: Task) => {
      return {
        id: task.id,
        name: task.name,
        description: task.description,
        points: task.points,
        label: task.label,
      };
    });

    return returnedTasks;
  }

  async getBacklogItem(id: string): Promise<BacklogItemResponseDto> {
    const task: Task = await this.taskRepository.findOneBy({
      id: id,
      assigned_to_sprint: IsNull(),
      completed: IsNull(),
    });

    if (!task) {
      console.info(`getBacklogItem - could not get item with id: ${id}`);
      return null;
    }

    const returnDto: BacklogItemResponseDto = {
      id: task.id,
      name: task.name,
      description: task.description,
      points: task.points,
      label: task.label,
    };

    return returnDto;
  }

  async editBacklogItem(
    id: string,
    editBacklogItemRequestDto: EditBacklogItemRequestDto,
  ): Promise<BacklogItemResponseDto> {
    // 1. Get the backlog item to edit
    const task: Task = await this.taskRepository.findOneBy({
      id: id,
      assigned_to_sprint: IsNull(),
      completed: IsNull(),
    });

    if (!task) {
      console.error(
        `editBacklogItem - Could not find backlog item with id: ${id}`,
      );
      throw new NotFoundException(
        `editBacklogItem - Could not find backlog item with id: ${id}`,
      );
    }

    // 2. Create new entity object with supplied params
    const itemToUpdate = await this.taskRepository.create(task);
    itemToUpdate.name = editBacklogItemRequestDto.name ?? itemToUpdate.name;
    itemToUpdate.points =
      editBacklogItemRequestDto.points ?? itemToUpdate.points;
    itemToUpdate.description =
      editBacklogItemRequestDto.description ?? itemToUpdate.description;

    const itemUpdated: Task = await this.taskRepository.save(itemToUpdate);

    // 3. Map entity to return dto
    const returnDto: BacklogItemResponseDto = {
      id: itemUpdated.id,
      name: itemUpdated.name,
      description: itemUpdated.description,
      points: itemUpdated.points,
      label: itemUpdated.label,
    };

    return returnDto;
  }

  async deleteBacklogItem(id: string): Promise<void> {
    // 1. Get the backlog item to edit
    const task: Task = await this.taskRepository.findOneBy({
      id: id,
      assigned_to_sprint: IsNull(),
      completed: IsNull(),
    });

    if (!task) {
      console.error(
        `deleteBacklogItem - Could not find backlog item with id: ${id}`,
      );
      throw new NotFoundException(
        `deleteBacklogItem - Could not find backlog item with id: ${id}`,
      );
    }

    await this.taskRepository.delete(id);
  }
}
