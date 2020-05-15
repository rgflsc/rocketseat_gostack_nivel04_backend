import { Repository, getRepository } from 'typeorm';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class UserTokensRepositry implements IUserTokensRepository {
  public async generate(user_id: string): Promise<UserToken> {
    return {
      id: '',
      token: '',
      user_id: '',
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}

export default UserTokensRepositry;
