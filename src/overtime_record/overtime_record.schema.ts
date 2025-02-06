import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
@Schema({ timestamps: true })
export class OvertimeRecord {
  @Prop({
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    index: true,
  })
  employeeId: Employee;
  @Prop({ required: true, type: Date, index: true })
  date: Date;
  @Prop({ required: true, type: Date, index: true })
  startTime: Date;
  @Prop({ required: true, type: Date })
  endTime: Date;
  @Prop({ required: false })
  totalHours: number;
  @Prop({ required: false })
  reason: string;
  @Prop({ required: true, default: 1.5 })
  rate: number; // Hệ số làm thêm giờ
  @Prop({ required: true, enum: Status, default: Status.PENDING, index: true })
  status: Status;
}
export const OverTimeRecordSchema =
  SchemaFactory.createForClass(OvertimeRecord);
