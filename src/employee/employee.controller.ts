import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  @Post('createEmployeeByAdmin')
  async createEmployeeByAdmin(@Body() data: any) {
    return this.employeeService.createEmployeeByAdmin(data);
  }
  @Post('addNewEmployee')
  async addNewEmployee(@Body() data: any) {
    return this.employeeService.addNewEmployee(data);
  }
  @Get('searchEmployeeByName')
  async searchEmployeeByName(@Query() fullName: string) {
    return this.employeeService.searchEmployeeByName(fullName);
  }
  @Get('searchEmployeeByPosition')
  async searchEmployeeByPosition(@Query() position: string) {
    return this.employeeService.searchEmployeeByPosition(position);
  }
  @Get('searchEmployeeByDepartmentName')
  async searchEmployeeByDepartmentName(@Query() departmentName: string) {
    return this.employeeService.searchEmployeeByDepartmentName(departmentName);
  }
  @Get('searchEmployeeByDepartmentId/:id')
  async searchEmployeeByDepartmentId(@Param('id') id: string) {
    return this.employeeService.searchEmployeeByDepartmentId(
      new Types.ObjectId(id),
    );
  }
}
