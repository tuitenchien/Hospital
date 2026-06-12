import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Appointment } from './appointment.entity';
import { AppointmentsService } from './appointment.service';
import { AppointmentsController } from './appointment.controller';

import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Patient, Doctor])],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
})
export class AppointmentsModule {}