import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AttendanceRecordService } from './attendance_record.service';
import { Types } from 'mongoose';

@Controller('attendance-record')
export class AttendanceRecordController {
  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
  ) {}
  @Post('/getTotalWorkHoursByEmployee/:id')
  async getTotalWorkHoursByEmployee(
    @Param('id') id: string,
    @Query() month: string,
  ) {
    return this.attendanceRecordService.getTotalWorkHoursByEmployee(
      new Types.ObjectId(id),
      month,
    );
  }
  @Post('createAttendanceRecordByAdmin')
  async createAttendanceRecordByAdmin(@Body() data: any) {
    return this.attendanceRecordService.createAttendanceRecordByAdmin(
      data.attendanceRecordDto,
    );
  }
  @Post('/getTotalWorkHoursByMonth/:id')
  async getTotalWorkHoursByMonth(@Query() month: string) {
    return this.attendanceRecordService.getTotalWorkHoursByMonth(month);
  }
  @Get('getAllAttendanceRecord')
  async getAllAttendanceRecord(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.attendanceRecordService.getAllAttendanceRecord(
      page,
      size,
      sort,
      order,
    );
  }
}
