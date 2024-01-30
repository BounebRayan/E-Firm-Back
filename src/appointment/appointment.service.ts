import { Injectable } from '@nestjs/common';
import { Appointment } from './entity/appointment.entity';
import { AppointmentDto } from './dtos/appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAppointmentDTO } from './dtos/updateAppointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async addAppointment(dto: AppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(dto);
    return await this.appointmentRepository.save(appointment);
  }

  async getAppointmentDemand(email: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { lawyerEmail: email, status: 'demande' },
    });
  }

  async getAppointmentProgress(email: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { lawyerEmail: email, status: 'en cours' },
    });
  }

  async getClientAppointmentProgress(email: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { clientEmail: email, status: 'en cours' },
    });
  }

  async getClientAppointmentComplete(email: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { clientEmail: email, status: 'terminée' },
    });
  }

  async getAppointmentComplete(email: string): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      where: { lawyerEmail: email, status: 'terminée' },
    });
  }

  async getAppointmentById(id: string): Promise<Appointment | undefined> {
    return await this.appointmentRepository.findOneBy({ id: id });
  }

  async deleteApointById(id: string): Promise<void> {
    await this.appointmentRepository.delete(id);
  }

  async updateRated(id: string): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id);

    if (appointment) {
      appointment.isRated = true;
      return await this.appointmentRepository.save(appointment);
    }

    return appointment;
  }

  async updateAppointment(
    id: string,
    dto: UpdateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id);

    if (appointment) {
      if (dto.description) {
        appointment.description = dto.description;
      }
      if (dto.todos) {
        appointment.todos = dto.todos;
      }
      if (dto.status) {
        appointment.status = dto.status;
      }
      if (dto.date) {
        appointment.date = new Date(dto.date);
      }

      await this.appointmentRepository.save(appointment);
    }

    return appointment;
  }
}
