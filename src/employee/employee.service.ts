import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';
import { Model, Types } from 'mongoose';
import { ContractService } from 'src/contract/contract.service';
import { DepartmentService } from 'src/department/department.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeSchema: Model<Employee>,
    private contractService: ContractService,
    private departmentService: DepartmentService,
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
  async createEmployeeByAdmin(employeeDto: any) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employeeDto.password, salt)
    const newEmployee = new this.employeeSchema({
      fullName: employeeDto.fullName,
      dob: employeeDto.dob,
      userName: employeeDto.userName,
      password: hashedPassword,
      role: employeeDto.role,
      department: employeeDto.department,
      position: employeeDto.position,
      baseSalary: employeeDto.baseSalary,
      bankAccount: employeeDto.bankAccount,
      insurance: employeeDto.insurance,
      taxCode: employeeDto.taxCode,
    });
    return await newEmployee.save();
  }
  async addNewEmployee(employeeInfo: any) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employeeInfo.password, salt);
    const newEmployee = new this.employeeSchema({
      fullName: employeeInfo.fullName,
      dob: employeeInfo.dob,
      department: employeeInfo.department,
      userName: employeeInfo.userName,
      password: hashedPassword,
      role: employeeInfo.role,
      position: employeeInfo.position,
      baseSalary: employeeInfo.baseSalary,
      bankAccount: employeeInfo.bankAccount,
      insurance: employeeInfo.insurance,
      taxCode: employeeInfo.taxCode,
    });
    const savedEmployee = await newEmployee.save();

    const newContract = await this.contractService.createContract({
      employeeId: savedEmployee._id,
      startDate: employeeInfo.contract.startDate,
      endDate: employeeInfo.contract.endDate,
      contractType: employeeInfo.contract.contractType,
      status: employeeInfo.contract.status,
      signDate: employeeInfo.contract.signDate,
      attachments: employeeInfo.contract.attachments,
    });
    return {
      employee: savedEmployee,
      contract: newContract,
    };
  }
  async searchEmployeeByName(fullName: string) {
    return await this.employeeSchema.find({
      fullName: {
        $regex: fullName,
        $options: 'i',
      },
    });
  }
  async searchEmployeeByPosition(position: string) {
    return await this.employeeSchema.find({
      position,
    });
  }
  async searchEmployeeByDepartmentName(departmentName: string) {
    return await this.employeeSchema.aggregate([
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentInfo',
        },
      },
      {
        $unwind: '$departmentInfo',
      },
      {
        $match: {
          '$departmentInfo.name': {
            $regex: departmentName,
            $options: 'i',
          },
        },
      },
    ]);
  }
  async searchEmployeeByDepartmentId(departmentId: Types.ObjectId) {
    return await this.employeeSchema.find({
      department: departmentId,
    });
  }
}
