import { Role } from './role.model';

export interface RolesRepository {
  findOne(id: string): Promise<Role | undefined>;
  create(role: Role): Promise<any>;
}
