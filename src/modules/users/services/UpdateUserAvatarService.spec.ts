import FakeUsersRepositry from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to update the avatar', async () => {
    const fakeUsersRepositry = new FakeUsersRepositry();
    const updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepositry);
    const createUserService = new CreateUserService(fakeUsersRepositry);

    const userCreate = await createUserService.execute({
      name: 'Rodrigo Garcia',
      email: 'rgflsc@gmail.com',
      password: '123456'
    });

    const user = await updateUserAvatarService.execute({
      user_id: userCreate.id,
      avatarFilename: 'teste'
    });

    expect(user.avatar).toBe('teste');
  });
});
