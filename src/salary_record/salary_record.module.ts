import { forwardRef, Module } from '@nestjs/common';
import { SalaryRecordService } from './salary_record.service';
import { SalaryRecordController } from './salary_record.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SalaryRecord, SalaryRecordSchema } from './salary_record.schema';
import { EmployeeModule } from 'src/employee/employee.module';
import { OvertimeRecordModule } from 'src/overtime_record/overtime_record.module';
import { DeductionModule } from 'src/deduction/deduction.module';
import { BonusModule } from 'src/bonus/bonus.module';
import { AttendanceRecordModule } from 'src/attendance_record/attendance_record.module';
import { OvertimeRecordService } from 'src/overtime_record/overtime_record.service';
import { AttendanceRecordService } from 'src/attendance_record/attendance_record.service';
import { DeductionService } from 'src/deduction/deduction.service';
import { BonusService } from 'src/bonus/bonus.service';
import {
  OvertimeRecord,
  OverTimeRecordSchema,
} from 'src/overtime_record/overtime_record.schema';
import {
  AttendanceRecord,
  AttendanceRecordSchema,
} from 'src/attendance_record/attendance_record.schema';
import { Deduction, DeductionSchema } from 'src/deduction/deduction.schema';
import { Bonus, BonusSchema } from 'src/bonus/bonus.schema';
import { AllowanceService } from 'src/allowance/allowance.service';
import { Allowance, AllowanceSchema } from 'src/allowance/allowance.schema';
import { AllowanceModule } from 'src/allowance/allowance.module';

@Module({
  controllers: [SalaryRecordController],
  providers: [
    SalaryRecordService,
    OvertimeRecordService,
    AttendanceRecordService,
    DeductionService,
    BonusService,
    AllowanceService,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: SalaryRecord.name,
        schema: SalaryRecordSchema,
      },
      {
        name: Allowance.name,
        schema: AllowanceSchema,
      },
      {
        name: OvertimeRecord.name,
        schema: OverTimeRecordSchema,
      },
      {
        name: AttendanceRecord.name,
        schema: AttendanceRecordSchema,
      },
      {
        name: Deduction.name,
        schema: DeductionSchema,
      },
      {
        name: Bonus.name,
        schema: BonusSchema,
      },
    ]),
    forwardRef(() => AttendanceRecordModule),
    forwardRef(() => EmployeeModule),
    forwardRef(() => OvertimeRecordModule),
    forwardRef(() => DeductionModule),
    forwardRef(() => BonusModule),
    forwardRef(() => AllowanceModule),
  ],
})
export class SalaryRecordModule {}
