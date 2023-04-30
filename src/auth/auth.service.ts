import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.adminService.findOne({ email: username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(username, pass) {
    const user = await this.adminService.findOne({ email: username });
    if (!user || user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user._id.toString() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
