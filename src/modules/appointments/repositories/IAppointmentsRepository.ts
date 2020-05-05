import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateApponimentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateApponimentDTO): Promise<Appointment>;

  findByDate(date: Date): Promise<Appointment | undefined>;
}
