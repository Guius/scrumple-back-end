import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityRecord } from '../entities/activity-record.entity';
import { Repository } from 'typeorm';
import { CreateActivityRecordMethodParams } from './dtos/create-activity-record-method-params.dto';

@Injectable()
export class ActivityRecordService {
  constructor(
    @InjectRepository(ActivityRecord)
    private repository: Repository<ActivityRecord>,
  ) {}

  async createOne(
    methodParams: CreateActivityRecordMethodParams,
  ): Promise<ActivityRecord> {
    const activityRecordToSave = await this.repository.create({
      duration_hours: methodParams.durationHours,
      reflection: methodParams.reflection,
      activity: methodParams.activity,
    });

    return await this.repository.save(activityRecordToSave);
  }
}
