import { Connection } from 'typeorm';

import { Event } from './event.entity';

export const eventProviders = [
  {
    provide: 'EVENT_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Event),
    inject: ['DATABASE_CONNECTION'],
  },
];
