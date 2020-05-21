import FakeAppointmenstRepositry from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmenstRepositry: FakeAppointmenstRepositry;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmenstRepositry = new FakeAppointmenstRepositry();
    createAppointmentService = new CreateAppointmentService(fakeAppointmenstRepositry);
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      provider_id: '123456',
      user_id: '123456',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two new appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      provider_id: '123456',
      user_id: '123456',
      date: appointmentDate,
    });

    await expect(createAppointmentService.execute({
      provider_id: '123456',
      user_id: '123456',
      date: appointmentDate,
    })).rejects.toBeInstanceOf(AppError)
  });
});
