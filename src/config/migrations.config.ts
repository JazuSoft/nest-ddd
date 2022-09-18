/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { authConstants } from './auth.config';
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
import { mongoconfig } from './mongo.config';
const connection = mongoconfig.connection;
const migrate = require('migrate');
import * as bcrypt from 'bcrypt';

@Injectable()
export class MigrationsConfig implements OnModuleInit {
  // onModuleInit() is executed before the app bootstraped
  async onModuleInit() {
    try {
      migrate.load(
        {
          stateStore: new dbStore(),
        },
        function (err, set) {
          if (err) {
            throw err;
          }
          set.up(function (err) {
            if (err) {
              throw err;
            }
            console.log('migrations successfully ran');
          });
        },
      );
    } catch (error) {
      throw error;
    }
  }

  // your other methods
}

class dbStore {
  url: any;
  mClient: any;

  constructor() {
    this.url = connection; // Manage this accordingly to your environment
    null;
    this.mClient = null;
  }

  public connect() {
    return MongoClient.connect(this.url).then((client) => {
      this.mClient = client;
      return client.db();
    });
  }

  public load(fn) {
    return this.connect()
      .then((db) => db.collection('migrations').find().toArray())
      .then((data) => {
        if (!data.length) return fn(null, {});
        const store = data[0];
        // Check if does not have required properties
        if (
          !Object.prototype.hasOwnProperty.call(store, 'lastRun') ||
          !Object.prototype.hasOwnProperty.call(store, 'migrations')
        ) {
          return fn(new Error('Invalid store file'));
        }
        return fn(null, store);
      })
      .catch(fn);
  }

  public save(set, fn) {
    return this.connect()
      .then((db) =>
        db.collection('migrations').updateOne(
          {},
          {
            $set: {
              lastRun: set.lastRun,
            },
            $push: {
              migrations: { $each: set.migrations },
            },
          },
          {
            upsert: true,
            multi: true,
          },
        ),
      )
      .then((result) => fn(null, result))
      .catch(fn);
  }
}
