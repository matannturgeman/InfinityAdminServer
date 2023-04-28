import { Test } from '@nestjs/testing';
import { databaseProviders } from './database.providers';

describe('Database', () => {

  beforeEach(async () => {
    await Test.createTestingModule({
      providers: databaseProviders,
    }).compile();
  });

  it('should be defined', () => {
    expect(databaseProviders).toBeDefined();
  });
});
