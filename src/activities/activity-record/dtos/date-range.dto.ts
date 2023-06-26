import { IsDefined, IsInt } from 'class-validator';

export class DateRange {
  @IsDefined()
  @IsInt()
  startDate: number;

  @IsDefined()
  @IsInt()
  endDate: number;
}
