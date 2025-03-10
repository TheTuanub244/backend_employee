import { Injectable, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AttendanceRecord, Status } from './attendance_record.schema';
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
    endTime = new Date(endTime);

    if (endTime <= startTime) {
      throw new Error('End time must be after start time.');
    }

    const totalMilliseconds = endTime.getTime() - startTime.getTime();
    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    return parseFloat(totalHours.toFixed(2));
  }
  async createAttendanceRecordByAdmin(attendanceRecordDto: any) {
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
  async checkIn(
    employeeId: Types.ObjectId,
    check_in_hour: Date,
    work_hour: Date,
  ) {
    let status;
    if (check_in_hour > work_hour) {
      status = Status.LATE;
    } else {
      status = Status.PRESENT;
    }
    const newAttendanceRecord = new this.attendanceRecordSchema({
      employeeId: employeeId,
      checkIn: check_in_hour,
      status,
    });

    const savedAttendanceRecord = await newAttendanceRecord.save();
    return savedAttendanceRecord;
  }
  async checkOut(
    employeeId: Types.ObjectId,
    check_out_hour: Date,
    note: string,
  ) {
    const findCheckIn = await this.attendanceRecordSchema.findOne({
      employeeId,
    });
    if (!findCheckIn) {
      return {
        message: 'Bạn chưa chấm công',
      };
    } else {
      const totalHours = await this.calculateTotalHours(
        findCheckIn.checkIn,
        check_out_hour,
      );
      const updateAttendanceRecord =
        await this.attendanceRecordSchema.findByIdAndUpdate(findCheckIn._id, {
          checkOut: check_out_hour,
          notes: note,
          workHours: totalHours,
        });
      return updateAttendanceRecord.save();
    }
  }
  async getAllMyAttendanceRecord(employeeId: Types.ObjectId) {
    return await this.attendanceRecordSchema.find({
      employeeId,
    });
  }
  async getTotalWorkHoursByEmployee(
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
  async getTotalWorkHoursByMonth(month: string) {
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(
      new Date(startDate).setMonth(startDate.getMonth() + 1),
    );

    return await this.attendanceRecordSchema.aggregate([
      {
        $match: {
          checkIn: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: '$employeeId',
          totalWorkHours: { $sum: '$workHours' },
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
          totalWorkHours: 1,
        },
      },
    ]);
  }
  async getAllAttendanceRecord(
    page: number,
    size: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const getAllAttendanceRecord = await this.attendanceRecordSchema
      .find()
      .populate('employeeId')
      .skip(skip)
      .limit(size)
      .sort({
        [field]: sortOrder,
      });
    const countGetAllAttendanceRecord =
      await this.attendanceRecordSchema.countDocuments();
    return {
      data: getAllAttendanceRecord,
      totalCount: countGetAllAttendanceRecord,
    };
  }
}
