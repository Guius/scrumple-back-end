import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from '../entities/sprint.entity';
import { SprintsController } from './sprint.controller';
import { SprintService } from './sprint.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint])],
  controllers: [SprintsController],
  providers: [SprintService],
})
export class SprintModule {}
