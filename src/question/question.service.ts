import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Question } from './question.entity';
import { Patient } from '../patients/patients.entity';
import { Doctor } from '../doctors/doctors.entity';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question)
        private repo: Repository<Question>,

        @InjectRepository(Patient)
        private patientRepo: Repository<Patient>,

        @InjectRepository(Doctor)
        private doctorRepo: Repository<Doctor>,
    ) { }

    async ask(userId: number, content: string) {
        const patient = await this.patientRepo.findOne({
            where: { user: { id: userId } },
        });
        if (!patient) {
            throw new Error('Patient not found');
        }
        const q = this.repo.create({
            patient,
            question: content,
        });

        return this.repo.save(q);
    }

    async answer(id: number, doctorUserId: number, answer: string) {
        const q = await this.repo.findOne({ where: { id } });
        if (!q) {
            throw new Error('Question not found');
        }
        const doctor = await this.doctorRepo.findOne({
            where: { user: { id: doctorUserId } },
        });

        if (!doctor) {
            throw new Error('Doctor not found');
        }
        q.answer = answer;
        q.doctor = doctor;

        return this.repo.save(q);
    }

    findAll() {
        return this.repo.find();
    }
}