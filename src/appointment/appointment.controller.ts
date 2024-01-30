import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto } from './dtos/appointment.dto';
import { UpdateAppointmentDTO } from './dtos/updateAppointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post('book')
  async book(@Body() dto: AppointmentDto) {
    return await this.appointmentService.addAppointment(dto);
  }

  @Delete('delete/:id')
  deleteAppointment(@Param('id') id: string) {
    this.appointmentService.deleteApointById(id);
  }
  @Get('/:id')
  getAppointmentById(@Param('id') id: string) {
    return this.appointmentService.getAppointmentById(id);
  }
  @Get('demand/:email')
  getAppointmentDemand(@Param('email') email: string) {
    return this.appointmentService.getAppointmentDemand(email);
  }

  @Get('progress/:email')
  getAppointmentProgress(@Param('email') email: string) {
    return this.appointmentService.getAppointmentProgress(email);
  }

  @Get('progressClient/:email')
  getClientAppointmentProgress(@Param('email') email: string) {
    return this.appointmentService.getClientAppointmentProgress(email);
  }

  @Get('completeClient/:email')
  getClientAppointmentComplete(@Param('email') email: string) {
    return this.appointmentService.getClientAppointmentComplete(email);
  }

  @Get('complete/:email')
  getAppointmentComplete(@Param('email') email: string) {
    return this.appointmentService.getAppointmentComplete(email);
  }

  @Patch('update/:id')
  updateAppointment(
    @Param('id') id: string,
    @Body() appointmentDto: UpdateAppointmentDTO,
  ) {
    console.log(appointmentDto);
    return this.appointmentService.updateAppointment(id, appointmentDto);
  }

  @Patch('rated/:id')
  updateRated(@Param('id') id: string) {
    return this.appointmentService.updateRated(id);
  }
}
