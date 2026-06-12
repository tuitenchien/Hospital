import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';
import { AppointmentStatus } from '../common/enums/appointment';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Patient, { eager: true })
  patient!: Patient;

  @ManyToOne(() => Doctor, { eager: true })
  doctor!: Doctor;

  @Column()
  appointmentDate!: Date;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status!: AppointmentStatus;
}