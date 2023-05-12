import { Test } from '@nestjs/testing';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

describe('ViewController', () => {
  let controller: ViewController;

  beforeEach(async () => {
    const mockViewService = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const module = await Test.createTestingModule({
      controllers: [ViewController],
      providers: [
        {
          provide: ViewService,
          useValue: mockViewService,
        },
      ],
    }).compile();

    controller = module.get<ViewController>(ViewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
