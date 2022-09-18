import { Filter } from '../filter.model';
import { JazuPaginate } from '../jazupaginate.model';
import { User } from './user.model';

export interface UsersRepository {
  search(filter: Filter): Promise<JazuPaginate<User>>;
  findOne(usernamae: string): Promise<User | undefined>;
  create(user: User): Promise<any>;
}
