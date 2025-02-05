import { Module } from '@nestjs/common';
import { AttendanceRecordController } from './attendance_record.controller';
import { AttendanceRecordService } from './attendance_record.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttendanceRecord,
  AttendanceRecordSchema,
} from './attendance_record.schema';

@Module({
  controllers: [AttendanceRecordController],
  providers: [AttendanceRecordService],
  imports: [
    MongooseModule.forFeature([
      {
        name: AttendanceRecord.name,
        schema: AttendanceRecordSchema,
      },
    ]),
  ],
})
export class AttendanceRecordModule {}
