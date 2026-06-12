import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from './news.entity';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

import { Doctor } from '../doctors/doctors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, Doctor]),
  ],
  providers: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}