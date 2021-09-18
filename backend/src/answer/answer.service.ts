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
    // const newAnswer = this.answerRepository.create(answerData);
    // const savedAnswer = await this.answerRepository.save(newAnswer);
    //
    // if (savedAnswer) {
    //   return {
    //     success: true,
    //   };
    // } else {
    //   return {
    //     success: false,
    //   };
    // }

    return {
      success: false,
    };
  }

  getWinners() {
    return this.answerRepository.query(`
      SELECT
        user_name as name,
        user_email as email,
        user_phone as phone,
        CONCAT('[ ', GROUP_CONCAT('{ "target": "', target_name, '", "selfie": "', selfie, '" }'), ' ]') AS data,
        COUNT(target_name) as count
      FROM (
        SELECT user.id as user_id, selfie, target.name as target_name, user.name as user_name, user.email as user_email, user.phone as user_phone
        FROM answer
        LEFT JOIN user ON user.id = answer.userId
        LEFT JOIN target ON target.id = answer.targetId
      ) as allAnswers
      GROUP BY user_id
      ORDER BY count DESC
      LIMIT 15
    `);
  }
}
