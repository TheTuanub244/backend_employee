import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employee.schema';

@Module({
  providers: [EmployeeService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
