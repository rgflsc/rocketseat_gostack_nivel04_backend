import { EntityRepository, Repository } from 'typeorm';

import User from '../models/User';

@EntityRepository(User)
class UserRepositry extends Repository<User> { }

export default UserRepositry;
