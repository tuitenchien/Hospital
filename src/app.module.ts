import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';
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
    PatientsModule
  ],
})
export class AppModule {}