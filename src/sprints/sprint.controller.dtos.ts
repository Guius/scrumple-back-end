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
