import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AdminModule } from './admin/admin.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ConfigModule.forRoot(), AdminModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AuthService, JwtService],
})
export class AppModule {}
