import { Body, Controller, Param, Post } from '@nestjs/common';
import { AttendanceRecordService } from './attendance_record.service';
import { Types } from 'mongoose';

@Controller('attendance-record')
export class AttendanceRecordController {
  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
  ) {}
  @Post('/getTotalWorkHours/:id')
  async getTotalWorkHours(@Param('id') id: string, @Body() data: any) {
    return this.attendanceRecordService.getTotalWorkHours(
      new Types.ObjectId(id),
      data.month,
    );
  }
  @Post('createAttendanceRecord')
  async createAttendanceRecord(@Body() data: any) {
    return this.attendanceRecordService.createAttendanceRecord(
      data.attendanceRecordDto,
    );
  }
}
