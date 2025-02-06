import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';

@Schema({ timestamps: true })
export class TaxRecord {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employeeId: Employee;

  @Prop({ required: true })
  taxCode: string; // Mã số thuế

  @Prop({ required: true })
  month: string; // Tháng nộp thuế

  @Prop({ required: true })
  taxableIncome: number; // Thu nhập chịu thuế

  @Prop({ required: true })
  taxAmount: number; // Số tiền thuế đã nộp

  @Prop()
  paymentDate: Date; // Ngày nộp thuế
}

export const TaxRecordSchema = SchemaFactory.createForClass(TaxRecord);
