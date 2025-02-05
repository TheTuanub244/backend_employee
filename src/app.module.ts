import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeController } from './employee/employee.controller';
import { EmployeeModule } from './employee/employee.module';
import { DepartmentModule } from './department/department.module';
import { ContractModule } from './contract/contract.module';
import { DocumentModule } from './document/document.module';
import { AttendanceRecordModule } from './attendance_record/attendance_record.module';
import { OvertimeRecordModule } from './overtime_record/overtime_record.module';
import { LeaveRequestModule } from './leave_request/leave_request.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    EmployeeModule,
    DepartmentModule,
    ContractModule,
    DocumentModule,
    AttendanceRecordModule,
    OvertimeRecordModule,
    LeaveRequestModule,
    MongooseModule.forRoot(process.env.DB_URI),
  ],
  controllers: [AppController, EmployeeController],
  providers: [AppService],
})
export class AppModule {}
