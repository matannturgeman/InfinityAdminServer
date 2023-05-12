import { Module } from '@nestjs/common';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';
import { viewProviders } from './providers/view.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ViewController],
  providers: [
    ViewService,
    ...viewProviders,
  ],
  exports: [ViewService],
})
export class ViewModule {}