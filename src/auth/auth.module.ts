import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminService } from 'src/admin/admin.service';
import { adminProviders } from 'src/admin/admin.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, AdminService, ...adminProviders],
  controllers: [AuthController],
})
export class AuthModule {}
