import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from '@src/shared/domain/roles/role.model';
import { MongoRole, MongoRoleDocument } from './mongo-role.schema';
import { RolesRepository } from '@src/shared/domain/roles/roles-repository';

@Injectable()
export class MongoRolesRepository implements RolesRepository {
  constructor(
    @InjectModel(MongoRole.name)
    private roleCollection: Model<MongoRoleDocument>,
  ) {}

  async findOne(id: string): Promise<Role | undefined> {
    const role = await this.roleCollection.findOne({ id: id }).exec();
    return MongoRole.toDomain(role);
  }

  create(role: Role): Promise<any> {
    const roleMongo = new this.roleCollection(MongoRole.fromDomain(role));
    return roleMongo.save();
  }
}
