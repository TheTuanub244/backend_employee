import { Test, TestingModule } from '@nestjs/testing';
import { SalaryRecordController } from './salary_record.controller';
import { SalaryRecordService } from './salary_record.service';

describe('SalaryRecordController', () => {
  let controller: SalaryRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryRecordController],
      providers: [SalaryRecordService],
    }).compile();

    controller = module.get<SalaryRecordController>(SalaryRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
