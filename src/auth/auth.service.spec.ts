import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockAdminService = { findOne: jest.fn() };
  let mockJwtService = { sign: jest.fn(), signAsync: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AdminService, useValue: mockAdminService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null if user not found', async () => {
    mockAdminService.findOne.mockResolvedValueOnce(null);
    expect(await service.validateUser('test@test.com', 'test')).toBeNull();
  });

  it('should return null if password does not match', async () => {
    mockAdminService.findOne.mockResolvedValueOnce({ email: 'test@test.com', password: 'wrong' });
    expect(await service.validateUser('test@test.com', 'test')).toBeNull();
  });

  it('should return user data without password if credentials are valid', async () => {
    const user = { email: 'test@test.com', password: 'test', name: 'Test' };
    mockAdminService.findOne.mockResolvedValueOnce(user);

    const result = await service.validateUser('test@test.com', 'test');
    expect(result).toBeDefined();
    expect(result.password).toBeUndefined();
    expect(result.email).toBe(user.email);
    expect(result.name).toBe(user.name);
  });

  it('signIn should throw UnauthorizedException if user not found', async () => {
    mockAdminService.findOne.mockResolvedValueOnce(null);

    await expect(service.signIn('test@test.com', 'test')).rejects.toThrow(UnauthorizedException);
  });

  it('signIn should return access_token if credentials are valid', async () => {
    const user = { email: 'test@test.com', password: 'test', _id: '123' };
    mockAdminService.findOne.mockResolvedValueOnce(user);
    mockJwtService.signAsync.mockResolvedValueOnce('fake_token');

    const result = await service.signIn('test@test.com', 'test');
    expect(result).toBeDefined();
    expect(result.access_token).toBe('fake_token');
  });
});
