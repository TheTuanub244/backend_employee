import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Allowance } from 'src/allowance/allowance.schema';
import { Bonus } from 'src/bonus/bonus.schema';
import { Deduction } from 'src/deduction/deduction.schema';
import { Employee } from 'src/employee/employee.schema';
import { OvertimeRecord } from 'src/overtime_record/overtime_record.schema';
export enum SalaryRecordStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}
@Schema({ timestamps: true })
export class SalaryRecord {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  })
  employeeId: Employee;

  @Prop({ required: true })
  month: string;

  @Prop({ required: true })
  baseSalary: number;

  @Prop({ default: 0 })
  workHours: number;

  @Prop({})
  overtimeHours: number;

  @Prop({})
  allowances: number;

  @Prop({})
  bonus: number;

  @Prop({})
  deductions: number;

  @Prop({ default: 0 }) // Tổng bảo hiểm đã trừ
  insurance: number;

  @Prop({ default: 0 }) //Thuế thu nhập cá nhân
  personalIncomeTax: number;

  @Prop({ required: true }) //Lương thực nhận
  netSalary: number;

  @Prop({
    default: SalaryRecordStatus.PENDING,
    enum: SalaryRecordStatus,
    index: true,
  })
  status: string;

  @Prop()
  paymentDate: Date;
}

export const SalaryRecordSchema = SchemaFactory.createForClass(SalaryRecord);
SalaryRecordSchema.index({ employeeId: 1, month: -1 });
