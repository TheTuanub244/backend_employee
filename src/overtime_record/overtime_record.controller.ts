import { Body, Controller, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OvertimeRecordService } from './overtime_record.service';

@Controller('overtime-record')
export class OvertimeRecordController {
  constructor(private overtimeRecordService: OvertimeRecordService) {}
  @Post('createOverTimeRecord')
  async createOverTimeRecord(@Body() data: any) {
    return this.overtimeRecordService.createOverTimeRecord(data);
  }
}
