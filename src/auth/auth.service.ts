import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.adminService.findOne({ email: username });
    const encryptedPassword = await this.cryptoService.encrypt(pass);
    if (!user || user?.password !== encryptedPassword) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async login(username, pass) {
    const user = await this.adminService.findOne({ email: username });
    const encryptedPassword = await this.cryptoService.encrypt(pass);
    if (!user || user?.password !== encryptedPassword) {
      throw new UnauthorizedException();
    }
    const { _id, password, ...restUser } = user;
    const payload = { id: _id.toString(), ...restUser };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
