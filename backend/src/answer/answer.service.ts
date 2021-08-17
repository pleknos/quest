import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @Inject('ANSWER_REPOSITORY')
    private answerRepository: Repository<Answer>,
  ) {}

  async add(answerData: Answer) {
    const newAnswer = this.answerRepository.create(answerData);
    const savedAnswer = await this.answerRepository.save(newAnswer);

    if (savedAnswer) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
      };
    }
  }
}
