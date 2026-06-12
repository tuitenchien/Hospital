import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';

import { MedicalRecordService } from './medicalRecord.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('medical-records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MedicalRecordController {
  constructor(private service: MedicalRecordService) {}

  @Post(':appointmentId')
  @Roles(Role.DOCTOR)
  create(@Param('appointmentId') id: string, @Body() body) {
    return this.service.create(Number(id), body);
  }

  @Get('my')
  @Roles(Role.PATIENT)
  getMy(@Request() req) {
    return this.service.findByPatient(req.user.sub);
  }
}