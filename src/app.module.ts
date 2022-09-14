import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoconfig } from './config/mongo.config';
import { eventEmitter2Config } from './config/event-emitter-2.config';
import { ControllersModule } from './controllers/controllers.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EmailsModule } from './services/emails/emails.module';

@Module({
  imports: [
    ControllersModule,
    MongooseModule.forRoot(mongoconfig.connection),
    EventEmitterModule.forRoot(eventEmitter2Config),
    EmailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
