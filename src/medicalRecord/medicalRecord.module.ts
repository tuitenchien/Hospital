import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicalRecord } from './medicalRecord.entity';
import { MedicalRecordService } from './medicalRecord.service';
import { MedicalRecordController } from './medicalRecord.controller';

import { Appointment } from '../appointment/appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalRecord, Appointment]),
  ],
  providers: [MedicalRecordService],
  controllers: [MedicalRecordController],
})
export class MedicalRecordModule {}