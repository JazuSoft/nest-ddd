import { Role } from '../domain/roles/role.model';

export class RoleResponse {
  constructor(public id: string, public name: string) {}

  static fromDomain(role: Role): RoleResponse {
    return new RoleResponse(role.id(), role.name());
  }
}
