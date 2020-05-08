import FakeUsersRepositry from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepositry = new FakeUsersRepositry();
    const createUserService = new CreateUserService(fakeUsersRepositry);

    const user = await createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Rodrigo Garcia');
  });

  it('should not be able to create two new user on the same email', async () => {
    const fakeUsersRepositry = new FakeUsersRepositry();
    const createUserService = new CreateUserService(fakeUsersRepositry);

    await createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    expect(createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  });
});
