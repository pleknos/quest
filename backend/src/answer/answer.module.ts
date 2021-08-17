import { Module } from '@nestjs/common';

import { answerProviders } from './answer.providers';
import { DatabaseModule } from '../database/database.module';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...answerProviders, AnswerService],
  controllers: [AnswerController],
  exports: [AnswerService],
})

export class AnswerModule {
}
