import { Module } from '@nestjs/common';
import { AttendanceRecordController } from './attendance_record.controller';
import { AttendanceRecordService } from './attendance_record.service';

@Module({
  controllers: [AttendanceRecordController],
  providers: [AttendanceRecordService]
})
export class AttendanceRecordModule {}
