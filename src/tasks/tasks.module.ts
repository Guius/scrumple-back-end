import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { BacklogController } from './backlog/backlog.controller';
import { ServicesModule } from 'src/services/services.module';
import { SprintTasksController } from './sprint-tasks/sprint-tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ServicesModule],
  controllers: [BacklogController, SprintTasksController],
  providers: [],
})
export class TasksModule {}
