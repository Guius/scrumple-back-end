import { Module } from '@nestjs/common';
import { ActivityRecordController } from './activity-record.controller';
import { ActivityRecordService } from './activity-record.service';
import { ActivityRecord } from '../entities/activity-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityRecord])],
  controllers: [ActivityRecordController],
  providers: [ActivityRecordService],
})
export class ActivityRecordModule {}
