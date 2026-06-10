import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) { }

  create(user: Partial<User>) {
    return this.userRepo.save(user);
  }

  findByCccd(cccd: string) {
    return this.userRepo.findOne({
      where: { cccd },
    });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  // 🔍 Tìm theo ID
  async findById(id: number) {
    const user = await this.userRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  // ❌ Xóa user (CASCADE patient/doctor nếu có)
  async remove(id: number) {
    const user = await this.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.userRepo.remove(user);
  }
}