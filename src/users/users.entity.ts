import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../common/enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  cccd!: string;

  @Column()
  password!: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.PATIENT,
  })
  role!: Role;
}