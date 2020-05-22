import FakeAppointmenstRepositry from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '@shared/errors/AppError';

let fakeAppointmenstRepositry: FakeAppointmenstRepositry;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmenstRepositry = new FakeAppointmenstRepositry();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointmentService = new CreateAppointmentService(fakeAppointmenstRepositry, fakeNotificationsRepository);
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointmentService.execute({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: new Date(2020, 4, 10, 13),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider_id');
  });

  it('should not be able to create two new appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 8).getTime();
    });

    const appointmentDate = new Date(2020, 5, 10, 11);

    await createAppointmentService.execute({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: appointmentDate,
    });

    await expect(createAppointmentService.execute({
      provider_id: 'provider_id',
      user_id: 'user_id',
      date: appointmentDate,
    })).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider_id',
        user_id: 'user_id',
        date: new Date(2020, 4, 10, 11),
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to create an appointment with same user as provier', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 8).getTime();
    });

    await expect(
      createAppointmentService.execute({
        provider_id: 'user_id',
        user_id: 'user_id',
        date: new Date(2020, 4, 10, 15),
      })
    ).rejects.toBeInstanceOf(AppError)
  });

  it('should be able to create an appointment before 8am and 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 8).getTime();
    });

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider_id',
        user_id: 'user_id',
        date: new Date(2020, 4, 11, 7),
      })
    ).rejects.toBeInstanceOf(AppError)

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider_id',
        user_id: 'user_id',
        date: new Date(2020, 4, 11, 18),
      })
    ).rejects.toBeInstanceOf(AppError)
  });
});
