import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import AppError from '@shared/errors/AppError';

describe('UpdateUserAvatar', () => {
  it('should be able to update the avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'teste.xxx'
    });

    expect(user.avatar).toBe('teste.xxx');
  });

  it('should not be able to update the avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    await expect(updateUserAvatarService.execute({
      user_id: 'not user',
      avatarFilename: 'teste.xxx'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'teste01.xxx'
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'teste02.xxx'
    });

    expect(deleteFile).toHaveBeenCalledWith('teste01.xxx');
    expect(user.avatar).toBe('teste02.xxx');
  });
});
