import { config as initDotenv } from 'dotenv';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';


initDotenv();

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    UserModule,
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
  ],
})

export class AppModule {
}
