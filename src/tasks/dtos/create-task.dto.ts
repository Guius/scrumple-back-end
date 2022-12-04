import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateBacklogItemRequestDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsInt()
  @IsOptional()
  points: number;
}

export class BacklogItemResponseDto {
  id: string;
  name: string;
  description: string;
  points: number;
  label: string;
}
