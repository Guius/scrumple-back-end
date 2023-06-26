import { Body, Controller, Post } from '@nestjs/common';
import { ActivityRecordService } from './activity-record.service';
import { CreateActivityRecordQueryDto } from './dtos/create-activity-record-request.dto';
import { CreateActivityRecordResponseDto } from './dtos/create-activity-record-response.dto';

@Controller('activity-record')
export class ActivityRecordController {
  constructor(private service: ActivityRecordService) {}

  @Post()
  async createOne(
    @Body() body: CreateActivityRecordQueryDto,
  ): Promise<CreateActivityRecordResponseDto> {
    const entity = await this.service.createOne({
      activity: body.activity,
      durationHours: body.durationHours,
      reflection: body.reflection,
    });

    return {
      duration_hours: entity.duration_hours,
      id: entity.id,
      reflection: entity.reflection,
      activity: entity.activity,
    };
  }
}
