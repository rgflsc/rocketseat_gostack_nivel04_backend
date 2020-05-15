import FakeAppointmenstRepositry from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmenstRepositry = new FakeAppointmenstRepositry();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmenstRepositry);

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123456'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create two new appointment on the same time', async () => {
    const fakeAppointmenstRepositry = new FakeAppointmenstRepositry();
    const createAppointmentService = new CreateAppointmentService(fakeAppointmenstRepositry);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123456'
    });

    await expect(createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });
});
