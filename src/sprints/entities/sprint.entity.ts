import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SprintStatus } from '../enums/sprint-status.enum';

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

  @Column({ nullable: true, type: 'bigint' })
  end_date: number;

  @Column({ nullable: true })
  sprint_completion_status: SprintStatus;

  @Column()
  sprint_number: number;

  @Column({ nullable: true, type: 'bigint' })
  complete: number;
}
