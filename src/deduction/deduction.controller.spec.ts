import { Test, TestingModule } from '@nestjs/testing';
import { DeductionController } from './deduction.controller';
import { DeductionService } from './deduction.service';

describe('DeductionController', () => {
  let controller: DeductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeductionController],
      providers: [DeductionService],
    }).compile();

    controller = module.get<DeductionController>(DeductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
