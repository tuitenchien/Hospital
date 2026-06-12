import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorsModule } from './doctors/doctors.module';
import { AppointmentsModule } from './appointment/appointment.module';
import { Question } from './question/question.entity';
import { QuestionsModule } from './question/question.module';
import { NewsModule } from './news/news.module';
import { MedicalRecordModule } from './medicalRecord/medicalRecord.module';
import { DashboardModule } from './dashboard/dashboard.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '11111',
      database: 'medicare',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
    QuestionsModule,
    NewsModule,
    MedicalRecordModule,
    DashboardModule
  ],
})
export class AppModule {}