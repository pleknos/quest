import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TargetService } from './target.service';

@Controller('target')
export class TargetController {
  constructor(
    private targetService: TargetService,
  ) {}

  @Get()
  async getPublic() {
    if (process.env.STARTED) {
      return this.targetService.findPublic();
    } else {
      return 'Не лезь, подумой';
    }
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    if (process.env.STARTED) {
      return this.targetService.findOne(id);
    } else {
      return 'Не лезь, подумой';
    }
  }
}
