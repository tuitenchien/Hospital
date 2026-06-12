import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';

import { Appointment } from '../appointment/appointment.entity';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Appointment, {
    onDelete: 'CASCADE',
  })
  appointment!: Appointment;

  @Column()
  diagnosis!: string;

  @Column('text')
  prescription!: string;

  @Column({ nullable: true })
  notes!: string;
}