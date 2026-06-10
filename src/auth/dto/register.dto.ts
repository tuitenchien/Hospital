import {
  IsNotEmpty,
  MinLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  fullName!: string;

  @IsNotEmpty()
  @MinLength(12)
  @Matches(/^[0-9]+$/)
  cccd!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  confirmPassword!: string;

  @IsNotEmpty()
  phone!: string;

  @IsNotEmpty()
  dateOfBirth!: string; // hoặc Date

  @IsNotEmpty()
  address!: string;
}