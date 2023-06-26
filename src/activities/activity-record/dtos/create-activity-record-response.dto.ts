import { Reflection } from '../../enums/reflect.enum';

export class CreateActivityRecordResponseDto {
  id: string;
  durationHours: number;
  reflection: Reflection;
  activity: string;
  activityDate: number;
}
