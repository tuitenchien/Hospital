import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';

import { QuestionsService } from './question.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class QuestionsController {
  constructor(private service: QuestionsService) {}

  @Post()
  @Roles(Role.PATIENT)
  ask(@Request() req, @Body() body) {
    return this.service.ask(req.user.sub, body.question);
  }

  @Post(':id/answer')
  @Roles(Role.DOCTOR)
  answer(@Param('id') id: string, @Request() req, @Body() body) {
    return this.service.answer(
      Number(id),
      req.user.sub,
      body.answer,
    );
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}