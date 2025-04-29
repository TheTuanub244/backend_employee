import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeaveRequest, Status } from './leave_request.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectModel(LeaveRequest.name)
    private leaveRequestSchema: Model<LeaveRequest>,
  ) {}
  calculateTotalDays(startDate: Date, endDate: Date): number {
    startDate = new Date(startDate)
    endDate = new Date(endDate)
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return diffInDays + 1; // +1 để tính cả ngày bắt đầu
  }
  async getAllMyLeaveRequest(employeeId: Types.ObjectId) {
    return await this.leaveRequestSchema.find({
      employeeId,
    });
  }
  async createLeaveRequest({
    employeeId,
    leaveType,
    startDate,
    endDate,
    reason,
  }) {
    const totalDays = this.calculateTotalDays(startDate, endDate);
    const newLeaveRequest = new this.leaveRequestSchema({
      employeeId,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      status: Status.PENDING,
    });
    return await newLeaveRequest.save();
  }
  async approveLeaveRequest(employeeId: Types.ObjectId) {
    const updateLeaveRequest = await this.leaveRequestSchema.findByIdAndUpdate(
      employeeId,
      {
        status: Status.APPROVED,
      },
    );
    return await updateLeaveRequest.save();
  }
  async rejectLeaveRequest(employeeId: Types.ObjectId) {
    const updateLeaveRequest = await this.leaveRequestSchema.findByIdAndUpdate(
      employeeId,
      {
        status: Status.REJECTED,
      },
    );
    return await updateLeaveRequest.save();
  }
  async getAllLeaveRequest(
    page: number,
    size: number,
    field: string,
    order: string,
    value: string,
    status: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const types = ['employeeName', 'status'];
    size = Number(size);
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'employees',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employeeDetails',
        },
      },
      {
        $unwind: { path: '$employeeDetails' },
      },
      {
        $addFields: {
          'employeeId.name': '$employeeDetails.name',
          'employeeId.department': '$employeeDetails.department',
        },
      },
    ];
    if (value) {
      pipeline.push({
        $match: {
          status,
        },
      });
    }
    const firstAggregate = await this.leaveRequestSchema.aggregate(pipeline);
    const countGetAllLeaveRequestRecord = firstAggregate.length;
    pipeline.push(
      {
        $sort: {
          [field]: sortOrder,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: size,
      },
    );
    const getAllLeaveRequestRecord =
      await this.leaveRequestSchema.aggregate(pipeline);
    return {
      data: getAllLeaveRequestRecord,
      totalCount: countGetAllLeaveRequestRecord,
    };
  }
}
