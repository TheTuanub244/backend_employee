import { Test, TestingModule } from '@nestjs/testing';
import { TaxRecordService } from './tax_record.service';

describe('TaxRecordService', () => {
  let service: TaxRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxRecordService],
    }).compile();

    service = module.get<TaxRecordService>(TaxRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
