import { Test } from '@nestjs/testing';
import { DatabaseModule } from './database.module';
import { DATABASE_CONNECTION } from './database.providers';

describe('DatabaseModule', () => {
  let module: DatabaseModule;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    })
      .overrideProvider(DATABASE_CONNECTION)
      .useValue(jest.fn().mockResolvedValue({}))
      .compile();

    module = testingModule.get<DatabaseModule>(DatabaseModule);
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
