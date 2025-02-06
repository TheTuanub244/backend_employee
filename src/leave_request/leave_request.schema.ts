import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
export enum LeaveType {
  ANNUAL_LEAVE = 'ANNUAL_LEAVE',
  SICK_LEAVE = 'SICK_LEAVE',
  UNPAID_LEAVE = 'UNPAID_LEAVE',
  MATERNITY_LEAVE = 'MATERNITY_LEAVE',
}
export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
@Schema({ timestamps: true })
export class LeaveRequest {
  @Prop({
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    index: true,
  })
  employeeId: Employee;
  @Prop({ required: true, enum: LeaveType, default: LeaveType.ANNUAL_LEAVE })
  leaveType: LeaveType;
  @Prop({ required: true, type: Date })
  startDate: Date;
  @Prop({ required: true, type: Date })
  endDate: Date;
  @Prop({ required: false })
  totalDays: number;
  @Prop({ required: false })
  reason: string;
  @Prop({ required: true, enum: Status, default: Status.PENDING, index: true })
  status: Status;
}

export const LeaveRequestSchema = SchemaFactory.createForClass(LeaveRequest);

LeaveRequestSchema.index({ reason: 'text' });
