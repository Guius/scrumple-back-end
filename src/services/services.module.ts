import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from 'src/entities/sprint.entity';
import { Task } from 'src/entities/tasks.entity';
import { BacklogService } from './backlog/backlog.service';
import { SprintService } from './sprints/sprint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Sprint])],
  providers: [BacklogService, SprintService],
  exports: [BacklogService, SprintService],
})
export class ServicesModule {}
