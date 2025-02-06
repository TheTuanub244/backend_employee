import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Employee, EmployeeSchema } from './employee.schema';
import { Contract, ContractSchema } from 'src/contract/contract.schema';
import { ContractModule } from 'src/contract/contract.module';
import { ContractService } from 'src/contract/contract.service';
import { DepartmentService } from 'src/department/department.service';
import { Department, DepartmentSchema } from 'src/department/department.schema';
import { DepartmentModule } from 'src/department/department.module';

@Module({
  providers: [EmployeeService, ContractService, DepartmentService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
      {
        name: Contract.name,
        schema: ContractSchema,
      },
      {
        name: Department.name,
        schema: DepartmentSchema,
      },
    ]),
    ContractModule,
    DepartmentModule,
  ],
  exports: [EmployeeService],
})
export class EmployeeModule {}
