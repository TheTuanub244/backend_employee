import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './employee.schema';
import { Model, Types } from 'mongoose';
import { ContractService } from 'src/contract/contract.service';
import { DepartmentService } from 'src/department/department.service';
import * as bcrypt from 'bcrypt';
import { Role } from './enum/roles.enum';
import { Department } from 'src/department/department.schema';
@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private employeeSchema: Model<Employee>,
    @InjectModel(Department.name)
    private departmentSchema: Model<Department>,
    private contractService: ContractService,
    private departmentService: DepartmentService,
  ) {}
  async getEmployeeById(id: Types.ObjectId) {
    const employee = await this.employeeSchema.aggregate([
      {
        $match: { _id: id },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentDetails',
        },
      },
      {
        $unwind: {
          path: '$departmentDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          'department.name': '$departmentDetails.name',
          departmentName: '$departmentDetails.name',
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    return employee[0];
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
      email: employeeInfo.email,
      phoneNumber: employeeInfo.phoneNumber,
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
    const employees = await this.employeeSchema.aggregate([
      {
        $match: {
          [type]: {
            $regex: value,
            $options: 'i',
          },
        },
      },
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentDetails',
        },
      },
      {
        $unwind: '$departmentDetails',
      },
      {
        $addFields: {
          'department.name': '$departmentDetails.name',
          departmentName: '$departmentDetails.name',
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

    return {
      data: employees,
    };
  }
  async searchEmployeeByDOB(dob: Date) {
    return await this.employeeSchema
      .find({
        dob,
      })
      .select('-password');
  }
  async getAllEmployee(
    page: number,
    size: number,
    field: string,
    order: string,
    value: string,
  ) {
    const skip = (page - 1) * size;
    const types = [
      'userName',
      'fullName',
      'email',
      'phoneNumber',
      'departmentName',
    ];
    const sortOrder = order === 'ASC' ? 1 : -1;
    size = Number(size);
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentDetails',
        },
      },
      {
        $unwind: {
          path: '$departmentDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          'department.name': '$departmentDetails.name',
          departmentName: '$departmentDetails.name',
        },
      },
      {
        $project: {
          password: 0,
        },
      },
    ];
    console.log(value);
    if (value) {
      pipeline.push({
        $match: {
          $or: types.map((type) => ({
            [type]: {
              $regex: value,
              $options: 'i',
            },
          })),
        },
      });
    }
    pipeline.push(
      {
        $sort: {
          [field]: sortOrder,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: size,
      },
    );

    const employees = await this.employeeSchema.aggregate(pipeline);

    const totalCount = await this.employeeSchema.countDocuments();

    return {
      data: employees,
      totalCount,
    };
  }
  async getAllEmployeeByDepartment(
    deparment: string,
    page: number,
    size: number,
    field: string,
    order: string,
  ) {
    size = Number(size);
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
    if (employeeDto.role === Role.DEPARTMENT_MANAGER) {
      const findManager = await this.departmentSchema.findOne({
        manager: employeeId,
      });
      if (!findManager) {
        const editPreviousManager = await this.employeeSchema.findByIdAndUpdate(
          findManager.manager,
          {
            role: Role.EMPLOYEE,
          },
        );
        await editPreviousManager.save();
        const editDepartment = await this.departmentSchema.findByIdAndUpdate(
          findManager._id,
          {
            manager: employeeId,
          },
        );

        await findManager.save();
        await editDepartment.save();
      }
    }
    const updatedEmployee = await this.employeeSchema.findByIdAndUpdate(
      employeeId,
      employeeDto,
    );
    const savedEmployee = await updatedEmployee.save();
    return savedEmployee;
  }

  async deleteEmployeeByAdminAndManager(employeeId: Types.ObjectId) {
    const findManager = await this.departmentSchema.findOne({
      manager: employeeId,
    });
    if (findManager) {
      findManager.manager = null;
      await findManager.save();
    }
    const deleteEmployee =
      await this.employeeSchema.findByIdAndDelete(employeeId);
    await deleteEmployee.save();
    return {
      message: 'Xóa nhân viên thành công',
    };
  }
}
