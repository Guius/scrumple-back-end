import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  creation_date: string;

  @UpdateDateColumn({ nullable: true })
  update_date: string;

  @Column({ type: 'bigint', nullable: true })
  completed: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  points: number;

  @Column({ nullable: true })
  label: string;

  @Column({ nullable: true })
  assigned_to_sprint: number;
}
