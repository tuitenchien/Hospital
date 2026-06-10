import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column()
  phone!: string;

  @Column()
  dateOfBirth!: string;

  @Column()
  address!: string;

  @OneToOne(() => User)
  @JoinColumn()
  user!: User;
}