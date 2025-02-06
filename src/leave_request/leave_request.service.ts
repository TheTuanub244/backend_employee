import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LeaveRequest } from './leave_request.schema';
import { Model } from 'mongoose';

@Injectable()
export class LeaveRequestService {
  constructor(
    @InjectModel(LeaveRequest.name)
    private leaveRequestSchema: Model<LeaveRequest>,
  ) {}
  calculateTotalDays(startDate: Date, endDate: Date): number {
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    const diffInMilliseconds = endDate.getTime() - startDate.getTime();
    const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

    return diffInDays + 1; // +1 để tính cả ngày bắt đầu
  }

  async createLeaveRequest({
    employeeId,
    leaveType,
    startDate,
    endDate,
    reason,
    status,
  }) {
    const totalDays = this.calculateTotalDays(startDate, endDate);
    const newLeaveRequest = new this.leaveRequestSchema({
      employeeId,
      leaveType,
      startDate,
      endDate,
      totalDays,
      reason,
      status,
    });
    return await newLeaveRequest.save();
  }
}
