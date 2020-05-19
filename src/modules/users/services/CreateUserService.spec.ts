import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Rodrigo Garcia');
  });

  it('should not be able to create two new user on the same email', async () => {
    await createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    await expect(createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });
});
