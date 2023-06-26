import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityRecord } from '../entities/activity-record.entity';
import { Between, FindOptionsWhere, Repository } from 'typeorm';
import { CreateActivityRecordMethodParams } from './dtos/create-activity-record-method-params.dto';
import { GetManyActivityRecordMethodParams } from './dtos/get-many-activity-record-method-params.dto';
import { ValidateMethodParams } from 'src/helpers/validate-method-params';

@Injectable()
export class ActivityRecordService {
  constructor(
    @InjectRepository(ActivityRecord)
    private repository: Repository<ActivityRecord>,
  ) {}

  async createOne(
    methodParams: CreateActivityRecordMethodParams,
  ): Promise<ActivityRecord> {
    await ValidateMethodParams(CreateActivityRecordMethodParams, methodParams);

    const activityRecordToSave = await this.repository.create({
      duration_hours: methodParams.durationHours,
      reflection: methodParams.reflection,
      activity: methodParams.activity,
      activity_date: methodParams.activityDate,
    });

    return await this.repository.save(activityRecordToSave);
  }

  async getMany(
    methodParams: GetManyActivityRecordMethodParams,
  ): Promise<ActivityRecord[]> {
    await ValidateMethodParams(GetManyActivityRecordMethodParams, methodParams);

    const findOptionsWhere: FindOptionsWhere<ActivityRecord> = {};

    // Set up querying between two dates
    // to query the activity records in day, supply the start time and end time of the day in question
    if (methodParams.dateRange)
      findOptionsWhere.activity_date = Between(
        methodParams.dateRange.startDate,
        methodParams.dateRange.endDate,
      );

    return await this.repository.find({
      where: findOptionsWhere,
    });
  }
}
