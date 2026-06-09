import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  cccd!: string;

  @IsString()
  password!: string;
}