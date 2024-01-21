import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprint } from '../entities/sprint.entity';
import { SprintsController } from './sprint.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([Sprint]), ServicesModule],
  controllers: [SprintsController],
  providers: [],
})
export class SprintModule {}
