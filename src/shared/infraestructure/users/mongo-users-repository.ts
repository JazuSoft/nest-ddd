import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MongoUser, MongoUserDocument } from './mongo-user.schema';
import { User } from '@src/shared/domain/users/user.model';
import { UsersRepository } from '@src/shared/domain/users/users-repository';
import { Filter } from '@src/shared/domain/filter.model';
import { JazuPaginate } from '@src/shared/domain/jazupaginate.model';

@Injectable()
export class MongoUsersRepository implements UsersRepository {
  constructor(
    @InjectModel(MongoUser.name)
    private userCollection: Model<MongoUserDocument>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const user = await this.userCollection.findOne({ email: email }).exec();
    return MongoUser.toDomain(user);
  }

  create(user: User): Promise<any> {
    const userMongo = new this.userCollection(MongoUser.fromDomain(user));
    return userMongo.save();
  }

  async search(filter: Filter): Promise<JazuPaginate<User>> {
    const queryBuilder = this.applyFilter(filter);
    const totalItems = await this.userCollection.count(queryBuilder).exec();
    const results = await this.userCollection
      .find(queryBuilder)
      .skip(filter.offset())
      .limit(filter.pagesize())
      .sort(filter.order())
      .exec();

    const items = results.map((u) => MongoUser.toDomain(u));

    return new JazuPaginate(
      items,
      filter.page(),
      filter.pagesize(),
      totalItems,
    );
  }

  private applyFilter(filter: Filter): any {
    const queryBuilder = {};

    if (filter.hasFilter('onlyactive')) {
      queryBuilder['status'] = 'active';
    }

    return queryBuilder;
  }
}
