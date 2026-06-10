import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { PatientsService } from '../patients/patients.service'; // 🔥 thêm
import { Role } from '../common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private patientsService: PatientsService, // 🔥 thêm
    private jwtService: JwtService,
  ) {}

  // 🔥 REGISTER
  async register(dto: RegisterDto) {
    const {
      cccd,
      password,
      confirmPassword,
      fullName,
      phone,
      dateOfBirth,
      address,
    } = dto;

    // check password
    if (password !== confirmPassword) {
      throw new BadRequestException('Password không khớp');
    }

    // check trùng CCCD
    const existing = await this.usersService.findByCccd(cccd);
    if (existing) {
      throw new BadRequestException('CCCD đã tồn tại');
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // 🔥 tạo USER
    const user = await this.usersService.create({
      cccd,
      password: hash,
      role: Role.PATIENT,
    });

    // 🔥 tạo PATIENT (đây là phần bạn đang thiếu)
    await this.patientsService.create({
      fullName,
      phone,
      dateOfBirth,
      address,
      user,
    });

    return {
      message: 'Đăng ký thành công',
    };
  }

  // 🔑 LOGIN
  async login(dto: any) {
    const user = await this.usersService.findByCccd(dto.cccd);

    if (!user) {
      throw new BadRequestException('Không tìm thấy người dùng');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Sai mật khẩu hoặc tài khoản');
    }

    // 🔥 payload chuẩn
    const payload = {
      sub: user.id,
      cccd: user.cccd,
      role: user.role,
    };

    return {
      message: 'Đăng nhập thành công',
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        cccd: user.cccd,
        role: user.role,
      },
    };
  }
}