import { IsOptional, ValidateNested } from 'class-validator';
import { DateRange } from './date-range.dto';
import { Type } from 'class-transformer';

export class GetManyActivityRecordMethodParams {
  @IsOptional()
  @ValidateNested()
  @Type(() => DateRange)
  dateRange?: DateRange;
}
