import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService = { signIn: jest.fn() };
  let mockLocalAuthGuard = { canActivate: jest.fn() };
  let mockAuthGuard = { canActivate: jest.fn() };
  let mockJwtService = {};
  let mockReflector = new Reflector();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: LocalAuthGuard, useValue: mockLocalAuthGuard },
        { provide: AuthGuard, useValue: mockAuthGuard },
        { provide: JwtService, useValue: mockJwtService },
        { provide: Reflector, useValue: mockReflector },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a JWT when signIn is called', async () => {
    const signInDto = { username: 'test@test.com', password: 'test' };
    const fakeToken = 'fake_token';
    mockAuthService.signIn.mockResolvedValueOnce({ access_token: fakeToken });

    const result = await controller.signIn(signInDto);

    expect(result.access_token).toBe(fakeToken);
    expect(mockAuthService.signIn).toBeCalledWith(signInDto.username, signInDto.password);
  });

  it('should return user data when getProfile is called', async () => {
    const fakeUser = { email: 'test@test.com' };
    const req = { user: fakeUser };

    const result = controller.getProfile(req);

    expect(result).toBe(fakeUser);
  });
});
