import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Doctor } from './doctors.entity';
import { User } from '../users/users.entity';
import { CreateDoctorDto } from './create-doctor.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class DoctorsService {
    constructor(
        @InjectRepository(Doctor)
        private doctorRepo: Repository<Doctor>,
        @InjectRepository(User)
        private userRepo: Repository<User>,
    ) { }

    async create(data: Partial<Doctor>, user: User) {
        const doctor = this.doctorRepo.create({
            ...data,
            user,
        });

        return this.doctorRepo.save(doctor);
    }

    async findAll() {
        return this.doctorRepo.find({
            relations: { user: true },
        });
    }

    async findById(id: number) {
        const doctor = await this.doctorRepo.findOne({
            where: { id },
            relations: { user: true },
        });

        if (!doctor) throw new NotFoundException('Doctor not found');

        return doctor;
    }

    async findByUserId(userId: number) {
        return this.doctorRepo.findOne({
            where: {
                user: { id: userId },
            },
        });
    }
    async createDoctor(dto: CreateDoctorDto) {
        const { cccd, password, fullName, specialty, phone } = dto;

        // check trùng CCCD
        const existing = await this.userRepo.findOne({
            where: { cccd },
        });

        if (existing) {
            throw new Error('CCCD already exists');
        }

        // hash password
        const hash = await bcrypt.hash(password, 10);

        // tạo user
        const user = await this.userRepo.save({
            cccd,
            password: hash,
            role: 'doctor',
        });

        // tạo doctor
        const doctor = this.doctorRepo.create({
            fullName,
            specialty,
            phone,
            user,
        });

        return this.doctorRepo.save(doctor);
    }
}