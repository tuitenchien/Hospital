import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PatientsModule } from '../patients/patients.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    PatientsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}