import { BacklogItemResponseDto } from 'src/tasks/dtos/create-task.dto';

export class CreateSprintResponseDto {
  id: string;
  sprintNumber: number;
}

export class GetCurrentSprintResponseDto {
  id: string;
  startDate: number;
  endDate: number;
  sprintNumber: number;
}

export class GetNotCompleteSprintResponseDto {
  sprintId: string;
  sprintNumber: number;
  sprintStartDate?: number;
  sprintDurationWeeks?: number;
  tasks: BacklogItemResponseDto[];
}
