import { EntityRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@EntityRepository(User)
class UserRepositry extends Repository<User> { }

export default UserRepositry;
