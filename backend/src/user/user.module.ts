import { Module } from '@nestjs/common';

import { userProviders } from './user.providers';
import { DatabaseModule } from '../database/database.module';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  exports: [UserService]
})

export class UserModule {
}
