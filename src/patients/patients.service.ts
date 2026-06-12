// src/patients/patients.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './patients.entity';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';

@Injectable()
export class PatientsService {
    constructor(
        @InjectRepository(Patient)
        private patientRepository: Repository<Patient>,
    ) { }
    //Tạo patient (dùng khi register)
    async create(data: {
        fullName: string;
        phone: string;
        dateOfBirth: string;
        address: string;
        user: User;
    }) {
        const patient = this.patientRepository.create(data);
        return this.patientRepository.save(patient);
    }

    //Lấy patient theo userId (dùng sau login)
    async findByUserId(userId: number) {
        const patient = await this.patientRepository.findOne({
            where: {
                user: { id: userId },
            },
            relations: {
                user: true,
            },
        });

        if (!patient) {
            throw new NotFoundException('Không tìm thấy bệnh nhân');
        }

        return patient;
    }

    //Lấy tất cả bệnh nhân (admin)
    async findAll() {
        return this.patientRepository.find({
            relations: {
                user: true,
            },
        });
    }

    //Lấy 1 bệnh nhân theo id
    async findOne(id: number) {
        const patient = await this.patientRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        });

        if (!patient) {
            throw new NotFoundException('Không tìm thấy bệnh nhân');
        }
        return patient;
    }

    //Update profile
    async update(userId: number, data: Partial<Patient>) {
        const patient = await this.findByUserId(userId);

        if (!patient) {
            throw new NotFoundException('Không tìm thấy bệnh nhân');
        }
        Object.assign(patient, data);
        return this.patientRepository.save(patient);
    }
    
}