import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  create(user: Partial<User>) {
    return this.userRepo.save(user);
  }

  findByCccd(cccd: string) {
    return this.userRepo.findOne({ where: { cccd } });
  }

  findById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  findAll() {
    return this.userRepo.find();
  }
}