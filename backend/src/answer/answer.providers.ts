import { Connection } from 'typeorm';

import { Answer } from './answer.entity';

export const answerProviders = [
  {
    provide: 'ANSWER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Answer),
    inject: ['DATABASE_CONNECTION'],
  },
];
