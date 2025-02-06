import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendanceRecord } from './attendance_record.schema';
import { Model, Types } from 'mongoose';
import { OvertimeRecordService } from 'src/overtime_record/overtime_record.service';

@Injectable()
export class AttendanceRecordService {
  constructor(
    @InjectModel(AttendanceRecord.name)
    private readonly attendanceRecordSchema: Model<AttendanceRecord>,
    private readonly overTimeRecordService: OvertimeRecordService,
  ) {}
  async calculateTotalHours(startTime: Date, endTime: Date) {
    if (endTime <= startTime) {
      throw new Error('End time must be after start time.');
    }

    const totalMilliseconds = endTime.getTime() - startTime.getTime();
    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    return parseFloat(totalHours.toFixed(2));
  }
  async createAttendanceRecord(attendanceRecordDto: any) {
    const workHours = this.calculateTotalHours(
      attendanceRecordDto.checkIn,
      attendanceRecordDto.checkOut,
    );
    const overtimeRecord =
      await this.overTimeRecordService.getOvertimeRecordWithEmployeeAndDate(
        attendanceRecordDto.employeeId,
        attendanceRecordDto.date,
      );
    const newAttendanceRecord = new this.attendanceRecordSchema({
      employeeId: attendanceRecordDto.employeeId,
      checkIn: attendanceRecordDto.checkIn,
      checkOut: attendanceRecordDto.checkOut,
      workHours,
      overtimeHours: overtimeRecord.totalHours,
      notes: attendanceRecordDto.notes || null,
    });
    return await newAttendanceRecord.save();
  }
  async getTotalWorkHours(
    employeeId: Types.ObjectId,
    month: string,
  ): Promise<number> {
    const start = new Date(`${month}-01`);
    const end = new Date(`${month}-31`);

    const records = await this.attendanceRecordSchema.find({
      employeeId,
      checkIn: { $gte: start, $lte: end },
    });

    return records.reduce((total, record) => total + record.workHours, 0);
  }
}
