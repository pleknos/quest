import { Module } from '@nestjs/common';

import { eventProviders } from './event.providers';
import { DatabaseModule } from '../database/database.module';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...eventProviders, EventService],
  controllers: [EventController],
  exports: [EventService],
})

export class EventModule {
}
