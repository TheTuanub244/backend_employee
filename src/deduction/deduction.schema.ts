import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
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

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employeeId: Employee;

  @Prop({ required: true })
  month: string;

  @Prop()
  reason: string;
}

export const DeductionSchema = SchemaFactory.createForClass(Deduction);
DeductionSchema.index({ employeeId: 1, month: 1 });
