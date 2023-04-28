import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  let module: DatabaseModule;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    })
      .overrideProvider('DATABASE_CONNECTION')
      .useValue(jest.fn().mockResolvedValue({}))
      .compile();

    module = testingModule.get<DatabaseModule>(DatabaseModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
