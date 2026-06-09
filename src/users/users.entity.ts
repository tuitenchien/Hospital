import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  cccd!: string;

  @Column()
  password!: string;

  @Column({ default: 'patient' })
  role!: string;
}