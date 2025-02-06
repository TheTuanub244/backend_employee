import { Module } from '@nestjs/common';
import { TaxRecordService } from './tax_record.service';
import { TaxRecordController } from './tax_record.controller';

@Module({
  controllers: [TaxRecordController],
  providers: [TaxRecordService],
})
export class TaxRecordModule {}
