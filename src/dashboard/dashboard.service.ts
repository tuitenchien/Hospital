import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/users.entity';
import { Appointment } from '../appointment/appointment.entity';
import { Role } from '../common/enums/role.enum';
import { AppointmentStatus } from '../common/enums/appointment';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,

    @InjectRepository(Appointment)
    private appRepo: Repository<Appointment>,
  ) {}

  async getDashboard() {
    const totalUsers = await this.userRepo.count();

    const totalPatients = await this.userRepo.count({
      where: { role: Role.PATIENT },
    });

    const totalDoctors = await this.userRepo.count({
      where: { role: Role.DOCTOR },
    });

    const totalAdmins = await this.userRepo.count({
      where: { role: Role.ADMIN },
    });

    const totalAppointments = await this.appRepo.count();

    const pendingAppointments = await this.appRepo.count({
      where: { status: AppointmentStatus.PENDING },
    });

    const confirmedAppointments = await this.appRepo.count({
      where: { status: AppointmentStatus.CONFIRMED },
    });

    const cancelledAppointments = await this.appRepo.count({
      where: { status: AppointmentStatus.CANCELLED },
    });

    return {
      users: {
        totalUsers,
        totalPatients,
        totalDoctors,
        totalAdmins,
      },
      appointments: {
        totalAppointments,
        pendingAppointments,
        confirmedAppointments,
        cancelledAppointments,
      },
    };
  }
}