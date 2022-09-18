import { AggregateRoot } from '@src/shared/domain/aggregate-root.model';
import { UserCreatedEvent } from '../../../services/users/domain/user-created.event';
import { Role } from '../roles/role.model';

export class User extends AggregateRoot {
  constructor(
    private _id: string,
    private _email: string,
    private _password: string,
    private _lastname: string,
    private _firstname: string,
    private _photo: string,
    private _roles: Role[],
  ) {
    super();
  }

  static create(
    id: string,
    email: any,
    password: string,
    lastname: string,
    firstname: string,
    photo: string,
    roles: Role[],
  ): User {
    const user = new User(
      id,
      email,
      password,
      lastname,
      firstname,
      photo,
      roles,
    );
    user.record(new UserCreatedEvent(user.id()));
    return user;
  }

  update(
    lastname: string,
    firstname: string,
    photo: string,
    roles: Role[],
  ): void {
    this._lastname = lastname;
    this._firstname = firstname;
    this._photo = photo;
    this._roles = roles;

    // this.record(new UserUpdatedEvent(this.id()));
  }

  id(): string {
    return this._id;
  }

  email() {
    return this._email;
  }

  password(): string {
    return this._password;
  }

  lastname(): string {
    return this._lastname;
  }

  firstname(): string {
    return this._firstname;
  }

  photo(): string {
    return this._photo;
  }

  roles(): Role[] {
    return this._roles || [];
  }
}
