import AppError from '@shared/errors/AppError';

import FakeAppointmenstRepositry from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvaliabilityService from './ListProviderMonthAvaliabilityService';

let fakeAppointmenstRepositry: FakeAppointmenstRepositry;
let listProviderMonthAvaliabilityService: ListProviderMonthAvaliabilityService;

describe('ListProviderMonthAvaliability', () => {
  beforeEach(() => {
    fakeAppointmenstRepositry = new FakeAppointmenstRepositry();
    listProviderMonthAvaliabilityService = new ListProviderMonthAvaliabilityService(fakeAppointmenstRepositry);
  });

  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmenstRepositry.create({
      provider_id: 'provider01',
      date: new Date(2020, 3, 20, 8, 0, 0),
    });

    await fakeAppointmenstRepositry.create({
      provider_id: 'provider01',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmenstRepositry.create({
      provider_id: 'provider01',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmenstRepositry.create({
      provider_id: 'provider01',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const availability = await listProviderMonthAvaliabilityService.execute({
      provider_id: 'provider01',
      year: 2020,
      month: 5,
    });

    expect(availability).toEqual(expect.arrayContaining([
      { day: 19, available: true },
      { day: 20, available: false },
      { day: 21, available: false },
      { day: 22, available: true },
    ]));
  });
});
