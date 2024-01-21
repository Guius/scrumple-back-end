import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from 'src/entities/sprint.entity';
import { Task } from 'src/entities/tasks.entity';
import { BacklogService } from './backlog/backlog.service';
import { SprintService } from './sprints/sprint.service';
import { SprintTasksService } from './sprint-tasks/sprint-tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Sprint])],
  providers: [BacklogService, SprintService, SprintTasksService],
  exports: [BacklogService, SprintService, SprintTasksService],
})
export class ServicesModule {}
