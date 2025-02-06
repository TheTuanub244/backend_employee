import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeSchema: Model<Employee>,
  ) {}
  async getEmployeeById(id: Types.ObjectId) {
    return this.employeeSchema.findById(id);
  }
  async getBaseSalary(employeeId: Types.ObjectId): Promise<number> {
    const employee = await this.getEmployeeById(employeeId);
    return employee.baseSalary;
  }
  async getInsuranceRate(employeeId: Types.ObjectId) {
    const employee = await this.getEmployeeById(employeeId);
    return employee.insurance;
  }
}
