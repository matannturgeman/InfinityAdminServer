import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { AdminModule } from 'src/admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';

import { adminProviders } from 'src/admin/admin.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';
import { CryptoService } from 'src/crypto/crypto.service';

@Module({
  imports: [
    DatabaseModule,
    AdminModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '60m' },
        } as JwtModuleOptions;
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    ...adminProviders,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CryptoService
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
