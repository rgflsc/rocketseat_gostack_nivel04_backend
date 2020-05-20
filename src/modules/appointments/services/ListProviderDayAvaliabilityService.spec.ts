import AppError from '@shared/errors/AppError';

import FakeAppointmenstRepositry from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvaliabilityService from './ListProviderDayAvaliabilityService';

let fakeAppointmenstRepositry: FakeAppointmenstRepositry;
let listProviderDayAvaliabilityService: ListProviderDayAvaliabilityService;

describe('ListProviderDayAvaliability', () => {
  beforeEach(() => {
    fakeAppointmenstRepositry = new FakeAppointmenstRepositry();
    listProviderDayAvaliabilityService = new ListProviderDayAvaliabilityService(fakeAppointmenstRepositry);
  });

  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmenstRepositry.create({
      provider_id: 'provider01',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmenstRepositry.create({
      provider_id: 'provider01',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    const availability = await listProviderDayAvaliabilityService.execute({
      provider_id: 'provider01',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: true },
    ]));
  });
});