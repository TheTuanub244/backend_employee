import { Controller, Get, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Types } from 'mongoose';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get('/getEmployeeById/:id')
  async getEmployeeById(@Param('id') id: string) {
    return this.employeeService.getEmployeeById(new Types.ObjectId(id));
  }
  @Get('/getBaseSalary/:id')
  async getBaseSalary(@Param('id') id: string) {
    return this.employeeService.getBaseSalary(new Types.ObjectId(id));
  }
  @Get('/getInsuranceRate/:id')
  async getInsuranceRate(@Param('id') id: string) {
    return this.employeeService.getInsuranceRate(new Types.ObjectId(id));
  }
}
