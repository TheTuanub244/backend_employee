import { forwardRef, Module } from '@nestjs/common';
import { AttendanceRecordController } from './attendance_record.controller';
import { AttendanceRecordService } from './attendance_record.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AttendanceRecord,
  AttendanceRecordSchema,
} from './attendance_record.schema';
import {
  OvertimeRecord,
  OverTimeRecordSchema,
} from 'src/overtime_record/overtime_record.schema';
import { OvertimeRecordService } from 'src/overtime_record/overtime_record.service';
import { OvertimeRecordModule } from 'src/overtime_record/overtime_record.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AttendanceRecordController],
  providers: [AttendanceRecordService, OvertimeRecordService],
  imports: [
    MongooseModule.forFeature([
      {
        name: AttendanceRecord.name,
        schema: AttendanceRecordSchema,
      },
      {
        name: OvertimeRecord.name,
        schema: OverTimeRecordSchema,
      },
    ]),
    JwtModule.register({
      secret: 'yourSecretKey',

      signOptions: { expiresIn: '60m' },
    }),
    forwardRef(() => OvertimeRecordModule),
  ],
})
export class AttendanceRecordModule {}
