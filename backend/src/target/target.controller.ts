import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { TargetService } from './target.service';
import { EventService } from '../event/event.service';

@Controller('target')
export class TargetController {
  constructor(
    private targetService: TargetService,
    private eventService: EventService,
  ) {}

  @Get()
  async getPublic(@Req() request) {
    if (await this.eventService.isStarted() || request.user.id === 40) {
      return this.targetService.findPublic();
    } else {
      return 'Не лезь, подумой';
    }
  }

  @Get(':id')
  async get(@Req() request, @Param('id') id: number) {
    if (await this.eventService.isStarted() || request.user.id === 40) {
      return this.targetService.findOne(id);
    } else {
      return 'Не лезь, подумой';
    }
  }
}
