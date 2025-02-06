import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OvertimeRecord, OverTimeRecordSchema } from './overtime_record.schema';

@Injectable()
export class OvertimeRecordService {
  constructor(
    @InjectModel(OvertimeRecord.name)
    private readonly overtimeRecordSchema: Model<OvertimeRecord>,
  ) {}
  async calculateTotalHours(startTime: Date, endTime: Date) {
    if (endTime <= startTime) {
      throw new Error('End time must be after start time.');
    }

    const totalMilliseconds = endTime.getTime() - startTime.getTime();
    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    return parseFloat(totalHours.toFixed(2));
  }
  async getOvertimeRecordWithEmployeeAndDate(
    employeeId: Types.ObjectId,
    date: Date,
  ) {
    return await this.overtimeRecordSchema.findOne({ employeeId, date });
  }
  async createOverTimeRecord(overtimeRecord: any) {
    const totalHours = this.calculateTotalHours(
      overtimeRecord.startTime,
      overtimeRecord.endTime,
    );
    const records = new this.overtimeRecordSchema({
      employeeId: overtimeRecord.employeeId,
      date: overtimeRecord.date,
      startTime: overtimeRecord.startTime,
      endTime: overtimeRecord.endTime,
      totalHours,
      reason: overtimeRecord.reason,
      rate: overtimeRecord.rate,
    });
    return await records.save();
  }
  async calculateOvertimePay(employee: any, month: string): Promise<number> {
    const startOfMonth = new Date(`${month}-01`);
    const endOfMonth = new Date(
      new Date(startOfMonth).setMonth(startOfMonth.getMonth() + 1),
    );

    // Lấy danh sách các ca làm thêm giờ đã được phê duyệt trong tháng
    const overtimeRecords = await this.overtimeRecordSchema.find({
      employeeId: employee._id,
      startTime: { $gte: startOfMonth, $lt: endOfMonth },
      status: 'APRROVED',
    });

    const baseSalary = employee.baseSalary;
    const standardHours = 160;

    let totalOvertimePay = 0;

    for (const record of overtimeRecords) {
      // Tính số giờ làm thêm nếu chưa có
      const totalHours =
        record.totalHours ||
        Math.abs(
          (new Date(record.endTime).getTime() -
            new Date(record.startTime).getTime()) /
            (1000 * 60 * 60),
        );

      const overtimePay =
        (baseSalary / standardHours) * totalHours * record.rate;

      totalOvertimePay += overtimePay;
    }

    return totalOvertimePay;
  }
}
