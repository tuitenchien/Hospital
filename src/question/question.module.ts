import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Question } from './question.entity';
import { QuestionsService } from './question.service';
import { QuestionsController } from './question.controller';

import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Patient, Doctor]),
  ],
  providers: [QuestionsService],
  controllers: [QuestionsController],
})
export class QuestionsModule {}