import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserModel } from '../../domain/users/user.model';

export type MongoUserDocument = MongoUser & Document;

@Schema({ collection: 'users' })
export class MongoUser {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  static toDomain(
    user: MongoUser &
      Document<any, any, any> & { _id: import('mongoose').Types.ObjectId },
  ): UserModel {
    return new UserModel(user._id, user.username, user.password);
  }

  static fromDomain(user: UserModel): MongoUser {
    const mongoUser = new MongoUser();
    mongoUser._id = user.id();
    mongoUser.username = user.username();
    mongoUser.password = user.password();
    return mongoUser;
  }
}

export const MongoUserSchema = SchemaFactory.createForClass(MongoUser);
