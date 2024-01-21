import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../entities/tasks.entity';
import { BacklogController } from './backlog/backlog.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ServicesModule],
  controllers: [BacklogController],
  providers: [],
})
export class TasksModule {}
