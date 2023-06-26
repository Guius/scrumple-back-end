import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Reflection } from '../enums/reflect.enum';

@Entity()
export class ActivityRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  creation_date: string;

  @UpdateDateColumn({ nullable: true })
  update_date: string;

  @Column({ type: 'bigint' })
  activity_date: number;

  @Column()
  activity: string;

  @Column()
  duration_hours: number;

  @Index()
  @Column()
  reflection: Reflection;
}
