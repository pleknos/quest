import { config as initDotenv } from 'dotenv';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { AnswerModule } from './answer/answer.module';
import { TargetModule } from './target/target.module';


initDotenv();

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
    AnswerModule,
    TargetModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})

export class AppModule {
}
