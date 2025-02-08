import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { OvertimeRecordService } from './overtime_record.service';
import { Types } from 'mongoose';

@Controller('overtime-record')
export class OvertimeRecordController {
  constructor(private overtimeRecordService: OvertimeRecordService) {}
  @Post('createOverTimeRecord')
  async createOverTimeRecord(@Body() data: any) {
    return this.overtimeRecordService.createOverTimeRecord(data);
  }
  @Get('getTotalOverTimeInMonth')
  async getTotalOverTimeInMonth(@Query('month') month: string) {
    return this.overtimeRecordService.getTotalOverTimeInMonth(month);
  }
  @Get('getAllOvertimeRecord')
  async getAllOvertimeRecord(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.overtimeRecordService.getAllOvertimeRecord(
      page,
      size,
      sort,
      order,
    );
  }
  @Get('getTotalOvertimeHoursInMonthByEmployee')
  async getTotalOvertimeHoursInMonthByEmployee(
    @Query('month') month: string,
    @Query('employeeId') employeeId: string,
  ) {
    return this.overtimeRecordService.getTotalOvertimeHoursInMonthByEmployee(
      new Types.ObjectId(employeeId),
      month,
    );
  }
}
