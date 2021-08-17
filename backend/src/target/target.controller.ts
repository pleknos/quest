import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TargetService } from './target.service';

@Controller('target')
export class TargetController {
  constructor(
    private targetService: TargetService,
  ) {}

  @Get(':id')
  async get(@Param('id') id: number) {
    console.log(id);
    return this.targetService.findOne(id);
  }
}
