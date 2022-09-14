import { AggregateRoot } from '@src/shared/domain/aggregate-root.model';
import { UserCreatedEvent } from '../../../services/users/domain/user-created.event';

export class UserModel extends AggregateRoot {
  constructor(
    private _id: string,
    private _username: string,
    private _password: string,
  ) {
    super();
  }

  static create(id: string, username: any, password: string): UserModel {
    const user = new UserModel(id, username, password);
    user.record(new UserCreatedEvent(user.id()));
    return user;
  }

  id(): string {
    return this._id;
  }

  /**
   * name
   */
  public username() {
    return this._username;
  }

  password(): string {
    return this._password;
  }
}
