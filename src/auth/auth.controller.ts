import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators/public.metadata';
import { User } from '../database/schemas/admin.schema';
import { GetCurrentUser } from '../common/decorators/get-current-user-id.decorator';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Throttle(5, 60 * 2)
  @Post('login')
  signIn(@Body() loginDto: Record<string, any>) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Get('profile')
  getProfile(@GetCurrentUser() user: User) {
    return {
      user,
      statusCode: HttpStatus.OK,
    };
  }
}
