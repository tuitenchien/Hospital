import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';

export enum Role {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

async register(dto: RegisterDto) {
  const { cccd, password, confirmPassword } = dto;

  if (password !== confirmPassword) {
    throw new BadRequestException('Password không khớp');
  }

  const existing = await this.usersService.findByCccd(cccd);
  if (existing) {
    throw new BadRequestException('CCCD already exists');
  }

  const hash = await bcrypt.hash(password, 10);

  return this.usersService.create({
    cccd,
    password: hash,
    role: Role.PATIENT,
  });
}

  async login(dto: any) {
    const user = await this.usersService.findByCccd(dto.cccd);

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Sai mật khẩu hoặc tài khoản');
    }

    return {
      message: 'Đăng nhập thành công',
      access_token: this.jwtService.sign({
        sub: user.id,
        cccd: user.cccd,
        role: user.role || user.role,
      }),
      user: {
        id: user.id,
        cccd: user.cccd,
        role: user.role || user.role,
      },
    };
  }
}