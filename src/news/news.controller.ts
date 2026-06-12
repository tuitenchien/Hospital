import {
  Controller,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';

import { NewsService } from './news.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('news')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NewsController {
  constructor(private service: NewsService) {}

  @Post()
  @Roles(Role.DOCTOR)
  create(@Request() req, @Body() body) {
    return this.service.create(req.user.sub, body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}