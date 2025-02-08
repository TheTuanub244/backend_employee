import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';

@Schema({ timestamps: true })
export class Bonus {
  @Prop({ required: true })
  name: string; // Ví dụ: "Thưởng dự án ABC"

  @Prop({ required: true })
  amount: number; // Số tiền thưởng

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' })
  employeeId: Employee;

  @Prop({ required: true, type: Date })
  month: Date; // Tháng nhận thưởng
}

export const BonusSchema = SchemaFactory.createForClass(Bonus);
BonusSchema.index({ employeeId: 1, month: 1 });
