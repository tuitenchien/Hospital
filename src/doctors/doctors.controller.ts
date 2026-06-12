import {
    Controller,
    Get,
    UseGuards,
    Request,
    Post,
    Body,
} from '@nestjs/common';

import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { CreateDoctorDto } from './create-doctor.dto';

@Controller('doctors')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DoctorsController {
    constructor(private doctorsService: DoctorsService) { }

    // 👤 patient xem danh sách bác sĩ
    @Get()
    @Roles(Role.PATIENT)
    findAll() {
        return this.doctorsService.findAll();
    }

    // 👨‍⚕️ doctor xem profile mình
    @Get('profile')
    @Roles(Role.DOCTOR)
    getProfile(@Request() req) {
        return this.doctorsService.findByUserId(req.user.sub);
    }
    @Post('create-doctor')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    createDoctor(@Body() body: CreateDoctorDto) {
        return this.doctorsService.createDoctor(body);
    }
}