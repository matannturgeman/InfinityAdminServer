import { Module } from '@nestjs/common';
import {
  ThrottlerGuard,
  ThrottlerModule as _ThrottlerModule,
} from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    _ThrottlerModule.forRoot({
      ttl: 60,
      limit: 40,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerModule {}
