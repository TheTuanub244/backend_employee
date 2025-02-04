import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
export enum Status {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
@Schema()
export class OvertimeRecord {
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Employee' })
  employeeId: Employee;
  @Prop({ required: true, type: Date })
  startTime: Date;
  @Prop({ required: true, type: Date })
  endTime: Date;
  @Prop({ required: false })
  totalHours: number;
  @Prop({ required: false })
  reason: string;
  @Prop({ required: true, enum: Status, default: Status.PENDING })
  status: Status;
}
export const OverTimeRecordSchema =
  SchemaFactory.createForClass(OvertimeRecord);
