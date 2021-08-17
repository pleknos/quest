import { Connection } from 'typeorm';

import { Target } from './target.entity';

export const targetProviders = [
  {
    provide: 'TARGET_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Target),
    inject: ['DATABASE_CONNECTION'],
  },
];
