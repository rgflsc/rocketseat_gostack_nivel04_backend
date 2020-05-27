import AppError from '@shared/errors/AppError';

import FakeAppointmenstRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmenstRepository: FakeAppointmenstRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmenstRepository = new FakeAppointmenstRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProviderAppointmentsService = new ListProviderAppointmentsService(fakeAppointmenstRepository, fakeCacheProvider);
  });

  it('should be able to list the appointments on a specific day', async () => {
    const appointment01 = await fakeAppointmenstRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id_01',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment02 = await fakeAppointmenstRepository.create({
      provider_id: 'provider_id',
      user_id: 'user_id_02',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider_id',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment01, appointment02]);
  });
});
