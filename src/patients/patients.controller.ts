import { Controller, Get, Patch, Body, Req, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  // 🔥 lấy profile
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return this.patientsService.findByUserId(req.user.sub);
  }

  // 🔥 update profile
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req() req, @Body() body) {
    return this.patientsService.update(req.user.sub, body);
  }
}