import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MedicalRecord } from './medicalRecord.entity';
import { Appointment } from '../appointment/appointment.entity';

@Injectable()
export class MedicalRecordService {
    constructor(
        @InjectRepository(MedicalRecord)
        private repo: Repository<MedicalRecord>,

        @InjectRepository(Appointment)
        private apptRepo: Repository<Appointment>,
    ) { }

    async create(appointmentId: number, data: any) {
        const appt = await this.apptRepo.findOne({
            where: { id: appointmentId },
            relations: {
                patient: true,
                doctor: true,
            }
        });
        if (!appt) {
            throw new NotFoundException('Appointment not found');
        }
        const record = this.repo.create({
            ...data,
            appointment: appt,
        });

        return this.repo.save(record);
    }

    findByPatient(userId: number) {
        return this.repo.find({
            where: {
                appointment: {
                    patient: {
                        user: {
                            id: userId,
                        },
                    },
                },
            },
            relations: {
                appointment: {
                    patient: true,
                    doctor: true,
                },
            },
        });
    }
}