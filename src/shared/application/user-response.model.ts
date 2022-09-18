import { User } from '../domain/users/user.model';
import { RoleResponse } from './role-response.model';

export class UserResponse {
  constructor(
    public id: string,
    public email: string,
    public lastname: string,
    public firstname: string,
    public photo: string,
    public roles: { id: string; name: string }[],
  ) {}

  static fromDomain(user: User): UserResponse {
    return new UserResponse(
      user.id(),
      user.email(),
      user.lastname(),
      user.firstname(),
      user.photo(),
      user.roles().map((x) => RoleResponse.fromDomain(x)),
    );
  }
}
