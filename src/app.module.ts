import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ThrottlerModule } from './throttler/throttler.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AdminModule,
    DatabaseModule,
    AuthModule,
    HealthModule,
    ThrottlerModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
