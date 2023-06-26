import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ActivityRecordService } from './activity-record.service';
import { CreateActivityRecordQueryDto } from './dtos/create-activity-record-request.dto';
import { CreateActivityRecordResponseDto } from './dtos/create-activity-record-response.dto';
import { GetManyActivityRecordRequestDto } from './dtos/get-many-activity-record-request.dto';
import { GetOneActivityRecordResponseDto } from './dtos/get-one-activity-record-response.dto';
import { ActivityRecord } from '../entities/activity-record.entity';
import { GetManyActivityRecordMethodParams } from './dtos/get-many-activity-record-method-params.dto';

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
      activityDate: body.activityDate,
    });

    return {
      durationHours: entity.duration_hours,
      id: entity.id,
      reflection: entity.reflection,
      activity: entity.activity,
      // big ints come out of the database as strings
      activityDate: entity.activity_date * 1,
    };
  }

  @Get()
  async getMany(
    @Query('startDate', ParseIntPipe) startDate: number,
    @Query('endDate', ParseIntPipe) endDate: number,
  ): Promise<GetOneActivityRecordResponseDto[]> {
    const methodParams: GetManyActivityRecordMethodParams = {};
    if (startDate && endDate)
      methodParams.dateRange = {
        endDate: endDate,
        startDate: startDate,
      };

    const entities = await this.service.getMany(methodParams);

    return entities.map((activityRecord: ActivityRecord) => {
      return {
        id: activityRecord.id,
        activity: activityRecord.activity,
        activityDate: activityRecord.activity_date,
        durationHours: activityRecord.duration_hours,
        reflection: activityRecord.reflection,
      };
    });
  }
}
