import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { News } from './news.entity';
import { Doctor } from '../doctors/doctors.entity';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private repo: Repository<News>,

    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) {}

  async create(userId: number, data: any) {
    const doctor = await this.doctorRepo.findOne({
      where: { user: { id: userId } },
    });

    const news = this.repo.create({
      ...data,
      doctor,
    });

    return this.repo.save(news);
  }

  findAll() {
    return this.repo.find();
  }
}