import { IsNotEmpty } from 'class-validator';

export class CreateDoctorDto {
  @IsNotEmpty()
  cccd!: string;

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  fullName!: string;

  @IsNotEmpty()
  specialty!: string;

  @IsNotEmpty()
  phone!: string;
}