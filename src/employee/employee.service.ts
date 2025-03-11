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
    return this.employeeSchema.findById(id).select('-password');
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
    const hashedPassword = await bcrypt.hash(employeeDto.password, salt);
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
      department: new Types.ObjectId(employeeInfo.department),
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
      attachments: employeeInfo.contract.attachments || [],
    });
    return {
      employee: savedEmployee,
      contract: newContract,
    };
  }
  async searchEmployee(value: string, type: string) {
    return await this.employeeSchema
      .find({
        [type]: {
          $regex: value,
          $options: 'i',
        },
      })
      .select('-password');
  }
  async getAllEmployee(
    page: number,
    size: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * size;
    const getAllEmployeeCount = await this.employeeSchema.countDocuments();
    const sortOrder = order === 'ASC' ? 1 : -1;
    const getAllEmployee = await this.employeeSchema
      .find()
      .select('-password')
      .skip(skip)
      .limit(size)
      .sort({
        [field]: sortOrder,
      });
    return {
      data: getAllEmployee,
      totalCount: getAllEmployeeCount,
    };
  }
  async getAllEmployeeByDepartment(
    deparment: string,
    page: number,
    size: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * size;
    size = size * 1;
    const sortOrder = order === 'ASC' ? 1 : -1;
    return await this.employeeSchema.aggregate([
      {
        $project: {
          password: 0,
        },
      },
      {
        $match: {
          'department.name': deparment,
        },
      },
      { $sort: { [field]: sortOrder } },
      { $skip: skip },
      { $limit: size },
    ]);
  }
  async updateEmployee(employeeId: Types.ObjectId, employeeDto: any) {
    const updatedEmployee = await this.employeeSchema.findByIdAndUpdate(
      employeeId,
      employeeDto,
    );
    const savedEmployee = await updatedEmployee.save();
    return savedEmployee;
  }
  async deleteEmployeeByAdminAndManager(employeeId: Types.ObjectId) {
    await this.employeeSchema.findByIdAndDelete(employeeId);
    return {
      message: 'Xóa nhân viên thành công',
    };
  }
}
