import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '@src/shared/domain/roles/role.model';
import { Document } from 'mongoose';
import { User } from '../../domain/users/user.model';
import * as mongoose from 'mongoose';

export type MongoUserDocument = MongoUser & Document;

@Schema({ collection: 'users' })
export class MongoUser {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: false })
  photo: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'roles' }] })
  roles: Role[];

  static toDomain(
    user: MongoUser &
      Document<any, any, any> & { _id: import('mongoose').Types.ObjectId },
  ): User {
    return new User(
      user._id,
      user.email,
      user.password,
      user.lastname,
      user.firstname,
      user.photo,
      user.roles,
    );
  }

  static fromDomain(user: User): MongoUser {
    const mongoUser = new MongoUser();
    mongoUser._id = user.id();
    mongoUser.email = user.email();
    mongoUser.password = user.password();
    mongoUser.lastname = user.lastname();
    mongoUser.firstname = user.firstname();
    mongoUser.photo = user.photo();
    return mongoUser;
  }
}

export const MongoUserSchema = SchemaFactory.createForClass(MongoUser);
