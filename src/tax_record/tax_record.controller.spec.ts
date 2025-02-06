import { Test, TestingModule } from '@nestjs/testing';
import { TaxRecordController } from './tax_record.controller';
import { TaxRecordService } from './tax_record.service';

describe('TaxRecordController', () => {
  let controller: TaxRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxRecordController],
      providers: [TaxRecordService],
    }).compile();

    controller = module.get<TaxRecordController>(TaxRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
