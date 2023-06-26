import { Reflection } from '../../enums/reflect.enum';

export class GetOneActivityRecordResponseDto {
  id: string;
  durationHours: number;
  reflection: Reflection;
  activity: string;
  activityDate: number;
}
