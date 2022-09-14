import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUser, MongoUserDocument } from './mongo-user.schema';
import { UserModel } from '@src/shared/domain/users/user.model';
import { UsersRepository } from '@src/shared/domain/users/users-repository';

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(MongoUser.name)
    private userCollection: Model<MongoUserDocument>,
  ) {}

  async findOne(username: string): Promise<UserModel | undefined> {
    const user = await this.userCollection
      .findOne({ username: username })
      .exec();
    return MongoUser.toDomain(user);
  }

  create(user: UserModel): Promise<any> {
    const userMongo = new this.userCollection(MongoUser.fromDomain(user));
    return userMongo.save();
  }
}
