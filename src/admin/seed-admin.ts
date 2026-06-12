import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const usersService = app.get(UsersService);

    const hash = await bcrypt.hash('1234567', 10);

    const admin = await usersService.create({
        cccd: '034204005828',
        password: hash,
        role: 'admin',
    });

    console.log('Admin created:', admin);

    await app.close();
}
bootstrap();