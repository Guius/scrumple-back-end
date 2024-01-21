import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { BacklogController } from './backlog/backlog.controller';
import { BacklogService } from './backlog/backlog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [BacklogController],
  providers: [BacklogService],
})
export class TasksModule {}
