// question.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Patient, { eager: true })
    patient!: Patient;

    @ManyToOne(() => Doctor, { nullable: true, eager: true })
    doctor!: Doctor;

    @Column()
    question!: string;

    @Column({ nullable: true })
    answer!: string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}