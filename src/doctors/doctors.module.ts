import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Doctor } from './doctors.entity';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { User } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor,User])],
  providers: [DoctorsService],
  controllers: [DoctorsController],
  exports: [DoctorsService],
})
export class DoctorsModule {}