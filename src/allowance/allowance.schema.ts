import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';

@Schema({ timestamps: true })
export class Allowance {
  @Prop({ required: true })
  name: string; // Ví dụ: "Phụ cấp ăn trưa"

  @Prop({ required: true })
  amount: number; // Số tiền phụ cấp

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employeeId: Employee;

  @Prop({ required: true, type: Date })
  month: Date; // Tháng áp dụng phụ cấp
}

export const AllowanceSchema = SchemaFactory.createForClass(Allowance);
AllowanceSchema.index({ employeeId: 1, month: 1 });
