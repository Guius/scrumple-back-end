import { IsDefined, IsEnum, IsInt, IsString } from 'class-validator';
import { Reflection } from 'src/activities/enums/reflect.enum';

export class CreateActivityRecordQueryDto {
  @IsInt()
  @IsDefined()
  durationHours: number;

  @IsDefined()
  @IsEnum(Reflection)
  reflection: Reflection;

  @IsDefined()
  @IsString()
  activity: string;

  @IsDefined()
  @IsInt()
  activityDate: number;
}
