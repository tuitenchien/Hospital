import {
    Controller,
    Get,
    Delete,
    Param,
    Query,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN) // 🔥 chỉ admin
export class UsersController {
    constructor(private usersService: UsersService) { }

    // 📋 GET ALL USERS
    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    // 🔍 GET USER BY ID
    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findById(id);
    }

    // 🔍 FIND BY CCCD (query ?cccd=xxx)
    @Get('cccd/:cccd')
    findByCccd(@Param('cccd') cccd: string) {
        return this.usersService.findByCccd(cccd);
    }

    // ❌ DELETE USER (CASCADE patient/doctor)
    @Delete('delete/:id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.remove(id);
    }
}