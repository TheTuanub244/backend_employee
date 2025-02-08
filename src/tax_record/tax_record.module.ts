import { forwardRef, Module } from '@nestjs/common';
import { TaxRecordService } from './tax_record.service';
import { TaxRecordController } from './tax_record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaxRecord, TaxRecordSchema } from './tax_record.schema';

@Module({
  controllers: [TaxRecordController],
  providers: [TaxRecordService],
  imports:[
    MongooseModule.forFeature([
      {
        name: TaxRecord.name,
        schema: TaxRecordSchema
      }
    ]),
    forwardRef(() => TaxRecordModule)
  ]
})
export class TaxRecordModule {}
