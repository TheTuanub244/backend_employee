import { Module } from '@nestjs/common';
import { OvertimeRecordController } from './overtime_record.controller';
import { OvertimeRecordService } from './overtime_record.service';

@Module({
  controllers: [OvertimeRecordController],
  providers: [OvertimeRecordService]
})
export class OvertimeRecordModule {}
