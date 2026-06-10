import {
  Controller,
  Get,
  Patch,
  Body,
  Req,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}
//Patient
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.patientsService.findByUserId(req.user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req() req, @Body() body) {
    return this.patientsService.update(req.user.sub, body);
  }
//Admin
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(Number(id));
  }
}