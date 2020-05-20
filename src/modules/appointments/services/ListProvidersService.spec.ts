import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user01 = await fakeUsersRepository.create({
      name: 'Usuario 01',
      email: 'usuario01@teste.com',
      password: '123456'
    });

    const user02 = await fakeUsersRepository.create({
      name: 'Usuario 02',
      email: 'usuario02@teste.com',
      password: '123456'
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Usuario 03',
      email: 'usuario03@teste.com',
      password: '123456'
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user01, user02]);
  });
});
