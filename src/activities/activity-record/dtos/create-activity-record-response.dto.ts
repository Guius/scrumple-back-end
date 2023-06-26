import { Reflection } from '../../enums/reflect.enum';

export class CreateActivityRecordResponseDto {
  id: string;
  duration_hours: number;
  reflection: Reflection;
  activity: string;
}
