import { Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { DatabaseModule } from '../database/database.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../common/guards/auth.guard';
import { CryptoService } from '../crypto/crypto.service';
import { authProviders } from './providers/auth.providers';

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
    ...authProviders,
    CryptoService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
