import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
      ],
      synchronize: process.env.ENVIROMENT.toUpperCase() === 'DEVELOPMENT',
    }),
  },
];
