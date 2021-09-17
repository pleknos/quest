import { Controller, Get, Req } from '@nestjs/common';
import { EventService } from './event.service';
import { Public } from '../auth/decorators/public.decorator';

@Controller('event')
export class EventController {
  constructor(
    private eventService: EventService,
  ) {}

  @Get()
  @Public()
  async get(@Req() request) {
    if (request.user?.id === 40 || request.user?.id === 154 || request.user?.id === 24) return { started: true };

    return {
      started: await this.eventService.isStarted(),
    };
  }
}
