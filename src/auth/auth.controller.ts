import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { Public } from '../common/decorators/public.metadata';
import { User } from '../database/schemas/admin.schema';
import { GetCurrentUser } from '../common/decorators/get-current-user-id.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() loginDto: Record<string, any>) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@GetCurrentUser() user: User) {
    return user;
  }
}
