import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { ViewModule } from './view/view.module';
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
    ViewModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
