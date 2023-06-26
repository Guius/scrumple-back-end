import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Activity {
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

  @Column()
  sprint_number: number;

  @Index()
  @Column({ nullable: true, type: 'bigint' })
  complete: number;
}
