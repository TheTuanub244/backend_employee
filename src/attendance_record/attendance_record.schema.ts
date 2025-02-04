import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
export enum Status {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
  OVERTIME = 'OVERTIME',
  BUSINESS_TRIP = 'BUSINESS_TRIP',
  LEAVE = 'LEAVE',
}
@Schema()
export class AttendanceRecord {
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Employee' })
  employeeId: Employee;
  @Prop({ required: true, type: Date })
  checkIn: Date;
  @Prop({ required: true, type: Date })
  checkOut: Date;
  @Prop({})
  workHours: number;
  @Prop({})
  overtimeHours: number;
  @Prop({ required: true, enum: Status, default: Status.PRESENT })
  status: Status;
  @Prop({ required: false })
  notes: string;
}
export const AttendanceRecordSchema =
  SchemaFactory.createForClass(AttendanceRecord);
