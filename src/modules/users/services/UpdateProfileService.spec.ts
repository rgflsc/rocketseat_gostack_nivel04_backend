import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Usuario 01',
      email: 'usuario01@teste.com',
      password: '123456'
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Usuario 02',
      email: 'usuario02@teste.com',
    });

    expect(updateUser.name).toBe('Usuario 02');
    expect(updateUser.email).toBe('usuario02@teste.com');
  });

  it('should not be able to update the profile with non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'non-existing-user-name',
        email: 'non-existing-user-email',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Usuario 01',
      email: 'usuario01@teste.com',
      password: '123456'
    });

    const user = await fakeUsersRepository.create({
      name: 'Usuario 02',
      email: 'usuario02@teste.com',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: user.name,
        email: 'usuario01@teste.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Usuario 01',
      email: 'usuario01@teste.com',
      password: '123456'
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Usuario 02',
      email: 'usuario02@teste.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Usuario 01',
      email: 'usuario01@teste.com',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Usuario 02',
        email: 'usuario02@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Usuario 01',
      email: 'usuario01@teste.com',
      password: '123456'
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Usuario 02',
        email: 'usuario02@teste.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
