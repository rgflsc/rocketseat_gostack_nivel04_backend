import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>

@injectable()
class ListProviderMonthAvaliabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {
    const appointments = this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    });

    console.log(appointments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvaliabilityService;
