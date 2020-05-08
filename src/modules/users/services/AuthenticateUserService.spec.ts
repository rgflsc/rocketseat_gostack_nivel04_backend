import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

import AppError from '@shared/errors/AppError';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    const response = await authenticateUserService.execute({
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be not able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(authenticateUserService.execute({
      email: 'rgflsc@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    const authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    await createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    expect(authenticateUserService.execute({
      email: 'rgflsc@gmail.com',
      password: '654321'
    })).rejects.toBeInstanceOf(AppError);
  });
});
