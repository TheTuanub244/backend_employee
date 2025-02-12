import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Types } from 'mongoose';
import { Role } from './enum/roles.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get('getAllEmployee')

  async getAllEmployee(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.employeeService.getAllEmployee(page, size, sort, order);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.EMPLOYEE, Role.DEPARTMENT_MANAGER, Role.ADMIN)
  @Post('updateEmployee/:id')
  async updateEmployee(@Param('id') id: string, @Body() data: any) {
    return this.employeeService.updateEmployee(new Types.ObjectId(id), data);
  }
  @Get('getAllEmployeeByDepartment')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DEPARTMENT_MANAGER)
  async getAllEmployeeByDepartment(
    @Query('department') department: string,
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.employeeService.getAllEmployeeByDepartment(
      department,
      page,
      size,
      sort,
      order,
    );
  }
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
}
