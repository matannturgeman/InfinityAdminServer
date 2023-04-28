import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), AdminModule, DatabaseModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
