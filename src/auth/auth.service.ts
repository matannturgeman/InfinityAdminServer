import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/crypto.service';
import { Admin, User } from '../database/schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const admin: Admin = await this.adminService.findOne({ email: username });
    const encryptedPassword = await this.cryptoService.encrypt(pass);
    if (!admin || admin?.password !== encryptedPassword) {
      return null;
    }
    const { password, ...result } = admin;
    return result;
  }

  async login(username, pass) {
    const admin = await this.adminService.findOne({ email: username });
    const encryptedPassword = await this.cryptoService.encrypt(pass);
    if (!admin || admin?.password !== encryptedPassword) {
      throw new UnauthorizedException();
    }
    const { _id, password, ...restUser } = admin;
    const payload: User = { id: _id, ...restUser };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}