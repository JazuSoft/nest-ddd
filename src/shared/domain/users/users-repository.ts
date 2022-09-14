import { UserModel } from './user.model';

export interface UsersRepository {
  findOne(usernamae: string): Promise<UserModel | undefined>;
  create(user: UserModel): Promise<any>;
}
