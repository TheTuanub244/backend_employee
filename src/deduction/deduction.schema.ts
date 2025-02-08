import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Employee } from 'src/employee/employee.schema';

export enum DeductionType {
  PENALTY = 'PENALTY',
  TAX = 'TAX',
  INSURANCE = 'INSURANCE',
}

@Schema({ timestamps: true })
export class Deduction {
  @Prop({ required: true, enum: DeductionType, default: DeductionType.TAX })
  type: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Types.ObjectId, ref: 'Employee' })
  employeeId: Employee;

  @Prop({ required: true, type: Date })
  month: Date;

  @Prop()
  reason: string;
}

export const DeductionSchema = SchemaFactory.createForClass(Deduction);
DeductionSchema.index({ employeeId: 1, month: 1 });
