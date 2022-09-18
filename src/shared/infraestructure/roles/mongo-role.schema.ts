import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@src/shared/domain/roles/role.model';
import { Document } from 'mongoose';

export type MongoRoleDocument = MongoRole & Document;

@Schema({ collection: 'roles' })
export class MongoRole {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  name: string;

  static toDomain(
    role: MongoRole &
      Document<any, any, any> & { _id: import('mongoose').Types.ObjectId },
  ): Role {
    return new Role(role._id, role.name);
  }

  static fromDomain(role: Role): MongoRole {
    const mongoRole = new MongoRole();
    mongoRole._id = role.id();
    mongoRole.name = role.name();
    return mongoRole;
  }
}

export const MongoRoleSchema = SchemaFactory.createForClass(MongoRole);
