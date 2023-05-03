import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Model } from 'mongoose';
import { IS_PUBLIC_KEY } from '../decorators/public.metadata';
import { User } from '../../database/schemas/admin.schema';
import { Token } from '../../database/schemas/token.schema';
import { TOKEN_MODEL } from '../../auth/providers/auth.providers';
import { CryptoService } from '../../crypto/crypto.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(TOKEN_MODEL)
    private tokenModel: Model<Token>,
    private jwtService: JwtService,
    private reflector: Reflector,
    private cryptoService: CryptoService,
  ) {}

  async validateTokenFromCollection(user: User, token) {
    const tokenDoc: Token = await this.tokenModel
      .findOne({ adminID: user.id }, { token: 1 })
      .lean()
      .exec();
    if (!tokenDoc) throw new UnauthorizedException();
    const decryptedToken = await this.cryptoService.decrypt(tokenDoc.token);
    if (token !== decryptedToken) throw new UnauthorizedException();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { exp, iat, ...user } = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      await this.validateTokenFromCollection(user, token);

      request.user = user as User;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
