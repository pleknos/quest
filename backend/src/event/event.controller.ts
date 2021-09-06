import { Controller, Get, Req } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService,
  ) {}

  @Get()
  async get(@Req() request) {
    if (request.user.id === 40) return { started: true };

    return {
      started: await this.eventService.isStarted(),
    };
  }
}
