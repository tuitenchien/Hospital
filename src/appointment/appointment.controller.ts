import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';

import { AppointmentsService } from './appointment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('appointments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppointmentsController {
  constructor(private service: AppointmentsService) { }

  // 👤 patient đặt lịch
  @Post()
  @Roles(Role.PATIENT)
  create(@Request() req, @Body() body) {
    return this.service.create(
      req.user.sub,
      body.doctorId,
      body.appointmentDate,
    );
  }

  // 👤 xem lịch của mình
  @Get('my')
  @Roles(Role.PATIENT)
  getMy(@Request() req) {
    return this.service.findByPatient(req.user.sub);
  }

  // 👨‍⚕️ bác sĩ xem lịch
  @Get('doctor')
  @Roles(Role.DOCTOR)
  getDoctor(@Request() req) {
    return this.service.findByDoctor(req.user.sub);
  }

  // ✔ xác nhận lịch
  @Post(':id/confirm')
  @Roles(Role.DOCTOR)
  confirm(@Param('id') id: string) {
    return this.service.confirm(Number(id));
  }
  @Get('admin')
  @Roles(Role.ADMIN)
  findAllForAdmin(@Request() req) {
    return this.service.findByDoctor(req.user.sub);
  }
  
}