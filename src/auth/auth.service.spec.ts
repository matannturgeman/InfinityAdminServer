import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';

describe('AuthService', () => {
  let service: AuthService;
  let mockAdminService = { findOne: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: AdminService, useValue: mockAdminService },
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
});
