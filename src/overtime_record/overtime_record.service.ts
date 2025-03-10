import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { OvertimeRecord, Status } from './overtime_record.schema';

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
  async approveOTRecord(id: Types.ObjectId) {
    const findOTRecord = await this.overtimeRecordSchema.findByIdAndUpdate(id, {
      status: Status.APPROVED,
    });
    return await findOTRecord.save();
  }
  async getAllMyOTRecord(employeeId: Types.ObjectId) {
    return await this.overtimeRecordSchema.find({
      employeeId,
    });
  }
  async rejectOTRecord(id: Types.ObjectId) {
    const findOTRecord = await this.overtimeRecordSchema.findByIdAndUpdate(id, {
      status: Status.REJECTED,
    });
    return await findOTRecord.save();
  }
  async getOvertimeRecordWithEmployeeAndDate(
    employeeId: Types.ObjectId,
    date: Date,
  ) {
    const dateOnly = date.setHours(0, 0, 0, 0);
    return await this.overtimeRecordSchema.findOne({
      employeeId,
      date: dateOnly,
    });
  }
  async createOverTimeRecord(overtimeRecord: any) {
    const totalHours = this.calculateTotalHours(
      overtimeRecord.startTime,
      overtimeRecord.endTime,
    );

    const records = new this.overtimeRecordSchema({
      employeeId: overtimeRecord.employeeId,
      date: overtimeRecord.date.setHours(0, 0, 0, 0),
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
  async getTotalOverTimeInMonth(month: string) {
    const startOfMonth = new Date(`${month}-01`);
    const endOfMonth = new Date(
      new Date(startOfMonth).setMonth(startOfMonth.getMonth() + 1),
    );
    return await this.overtimeRecordSchema.aggregate([
      {
        $match: {
          date: { $gte: startOfMonth, $lt: endOfMonth },
          status: 'APPROVED',
        },
      },
      {
        $group: {
          _id: '$employeeId',
          totalOvertimeHours: { $sum: '$totalHours' },
        },
      },
      {
        $lookup: {
          from: 'employees',
          localField: '_id',
          foreignField: '_id',
          as: 'employeeInfo',
        },
      },
      {
        $project: {
          _id: 0,
          employeeId: '$_id',
          employeeName: { $arrayElemAt: ['$employeeInfo.fullName', 0] },
          totalOvertimeHours: 1,
        },
      },
    ]);
  }
  async getAllOvertimeRecord(
    page: number,
    perPage: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * perPage;
    const sortOrder = order === 'ASC' ? 1 : -1;
    return await this.overtimeRecordSchema
      .find()
      .skip(skip)
      .limit(perPage)
      .sort({
        [field]: sortOrder,
      });
  }
  async getTotalOvertimeHoursInMonthByEmployee(
    employeeId: Types.ObjectId,
    month: string,
  ) {
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(
      new Date(startDate).setMonth(startDate.getMonth() + 1),
    );

    const result = await this.overtimeRecordSchema.aggregate([
      {
        $match: {
          employeeId: employeeId,
          date: { $gte: startDate, $lt: endDate },
          status: 'APPROVED',
        },
      },
      {
        $group: {
          _id: null,
          totalOvertimeHours: { $sum: '$totalHours' },
        },
      },
    ]);

    return result.length > 0 ? result[0].totalOvertimeHours : 0;
  }
}
