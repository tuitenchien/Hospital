// news.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from 'typeorm';
import { Doctor } from '../doctors/doctors.entity';

@Entity()
export class News {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column('text')
    content!: string;

    @ManyToOne(() => Doctor, { eager: true })
    doctor!: Doctor;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}