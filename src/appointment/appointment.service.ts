import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Appointment } from './appointment.entity';
import { AppointmentStatus } from '../common/enums/appointment';
import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepo: Repository<Appointment>,

    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(Doctor)
    private doctorRepo: Repository<Doctor>,
  ) { }

  async create(userId: number, doctorId: number, date: Date) {
    const patient = await this.patientRepo.findOne({
      where: { user: { id: userId } },
    });

    const doctor = await this.doctorRepo.findOne({
      where: { id: doctorId },
    });

    if (!patient) throw new NotFoundException('Patient not found');
    if (!doctor) throw new NotFoundException('Doctor not found');

    const appointment = this.appointmentRepo.create({
      patient,
      doctor,
      appointmentDate: date,
    });

    return this.appointmentRepo.save(appointment);
  }

  async findByPatient(userId: number) {
    return this.appointmentRepo.find({
      where: {
        patient: { user: { id: userId } },
      },
      relations: {doctor:true},
    });
  }

  async findByDoctor(userId: number) {
    return this.appointmentRepo.find({
      where: {
        doctor: { user: { id: userId } },
      },
      relations: {patient:true},
    });
  }

  async confirm(id: number) {
    const appt = await this.appointmentRepo.findOne({
      where: { id },
    });

    if (!appt) throw new NotFoundException('Appointment not found');

    appt.status = AppointmentStatus.CONFIRMED;

    return this.appointmentRepo.save(appt);
  }
  async findAll() {
    return this.appointmentRepo.find({
      relations: {
        patient: true,
        doctor: true,
      }
    });
  }
}