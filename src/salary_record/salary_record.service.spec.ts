import { Test, TestingModule } from '@nestjs/testing';
import { SalaryRecordService } from './salary_record.service';

describe('SalaryRecordService', () => {
  let service: SalaryRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryRecordService],
    }).compile();

    service = module.get<SalaryRecordService>(SalaryRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
