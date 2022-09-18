import { AggregateRoot } from '@src/shared/domain/aggregate-root.model';

export class Role extends AggregateRoot {
  constructor(private _id: string, private _name: string) {
    super();
  }

  static create(id: string, name: any): Role {
    const role = new Role(id, name);
    return role;
  }

  id(): string {
    return this._id;
  }

  name() {
    return this._name;
  }
}
