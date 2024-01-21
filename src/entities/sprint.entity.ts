import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SprintStatus } from '../sprints/enums/sprint-status.enum';

@Entity()
export class Sprint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  creation_date: string;

  @UpdateDateColumn({ nullable: true })
  update_date: string;

  @Column({ nullable: true, type: 'bigint' })
  start_date: number;

  @Column({ nullable: true, type: 'int' })
  sprint_duration_weeks: number;

  @Column({ nullable: true, type: 'bigint' })
  end_date: number;

  @Column({ nullable: true })
  sprint_completion_status: SprintStatus; // don't know if we want this yet

  @Column()
  sprint_number: number;
}
