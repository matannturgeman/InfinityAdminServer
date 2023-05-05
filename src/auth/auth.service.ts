import { Model } from 'mongoose';
import { HttpStatus, Inject, Injectable, UnauthorizedException,  } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/crypto.service';
import { Admin, User } from '../database/schemas/admin.schema';
import { TOKEN_MODEL } from './providers/auth.providers';
import { Token } from '../database/schemas/token.schema';
import type { ObjectId } from '../common/types/objectId.type';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TOKEN_MODEL)
    private tokenModel: Model<Token>,
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

  async updateAccessToken(adminID: ObjectId, token: string): Promise<Token> {
    const hashedToken = await this.cryptoService.encrypt(token);
    return this.tokenModel
      .findOneAndUpdate(
        { adminID },
        { token: hashedToken },
        { upsert: true, new: true },
      )
      .lean()
      .exec();
  }

  async login(username, pass) {
    const admin = await this.adminService.findOne({ email: username });
    const encryptedPassword = await this.cryptoService.encrypt(pass);
    if (!admin || admin?.password !== encryptedPassword) {
      throw new UnauthorizedException();
    }
    const { _id, password, ...restUser } = admin;
    const payload: User = { id: _id, ...restUser };

    const access_token = await this.jwtService.signAsync(payload);

    // not waiting intentionally
    this.updateAccessToken(payload.id, access_token);

    return {
      access_token,
      statusCode: HttpStatus.OK
    };
  }
}
