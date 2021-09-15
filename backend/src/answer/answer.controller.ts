import { Body, Controller, Get, Post, Req, UseInterceptors } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from './answer.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { S3UploadInterceptor } from '../interceptors/s3upload.interceptor';

@Controller('answer')
export class AnswerController {
  constructor(
    private answerService: AnswerService,
  ) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'selfie', maxCount: 1 },
  ]), S3UploadInterceptor)
  add(@Body() answerData: Answer, @Req() request) {
    const userId = request.user.id;
    return this.answerService.add({ ...answerData, userId });
  }

  @Get('winners')
  getWinners() {
    return this.answerService.getWinners();
  }
}
