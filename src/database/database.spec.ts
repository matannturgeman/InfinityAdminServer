import { Test } from '@nestjs/testing';
import { databaseProviders } from './database.providers';

describe('Database', () => {
  let providers;

  beforeEach(async () => {
    providers = await Test.createTestingModule({
      providers: [
        ...databaseProviders.map((provider) => {
          if (provider.provide === 'DATABASE_CONNECTION') {
            return {
              ...provider,
              useFactory: jest.fn(() => ({})), // Mocking the useFactory function
            };
          }
          return provider;
        }),
      ],
    }).compile();
  });

  it('should be defined', () => {
    expect(providers).toBeDefined();
  });
});
