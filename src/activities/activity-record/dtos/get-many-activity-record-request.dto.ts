import { IsInt, IsOptional, IsString } from 'class-validator';

export class GetManyActivityRecordRequestDto {
  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  endDate?: string;
}
