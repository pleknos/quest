import { Module } from '@nestjs/common';

import { targetProviders } from './target.providers';
import { DatabaseModule } from '../database/database.module';
import { TargetService } from './target.service';
import { TargetController } from './target.controller';
import { EventModule } from '../event/event.module';

@Module({
  imports: [DatabaseModule, EventModule],
  providers: [...targetProviders, TargetService],
  controllers: [TargetController],
  exports: [TargetService],
})

export class TargetModule {
}
