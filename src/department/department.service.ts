import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './department.schema';
import { Model, Types } from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
import { Role } from 'src/employee/enum/roles.enum';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentSchema: Model<Department>,
    @InjectModel(Employee.name)
    private employeeSchema: Model<Employee>,
  ) {}
  async createDepartment({ name, description, manager }) {
    const newDepartment = new this.departmentSchema({
      name,
      description,
      manager,
    });
    return await newDepartment.save();
  }
  async getAllDepartment(
    page: number,
    size: number,
    field: string,
    order: string,
    value: string,
  ) {
    size = Number(size);
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;

    const pipeline: any[] = [
      {
        $lookup: {
          from: 'employees',
          localField: 'manager',
          foreignField: '_id',
          as: 'managerDetails',
        },
      },
      {
        $unwind: {
          path: '$managerDetails',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          'manager.fullName': '$managerDetails.fullName',
          'manager._id': '$managerDetails._id',
        },
      },
      {
        $project: {
          managerDetails: 0,
        },
      },
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
    ];
    if (value) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: value, $options: 'i' } },
            { managerName: { $regex: value, $options: 'i' } },
          ],
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
    const getAllDepartment = await this.departmentSchema.aggregate(pipeline);
    const countAllDepartment =  getAllDepartment.length;
    return {
      totalCount: countAllDepartment,
      data: getAllDepartment,
    };
  }
  async getDepartmentById(departmentId: Types.ObjectId) {
    const deparment = await this.departmentSchema.aggregate([
      {
        $match: { _id: departmentId },
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'manager',
          foreignField: '_id',
          as: 'managerDetails',
        },
      },
      {
        $unwind: { path: '$managerDetails', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          'manager.fullName': '$managerDetails.fullName',
          managerName: '$managerDetails.fullName',
        },
      },
      {
        $project: {
          managerDetails: 0,
        },
      },
    ]);

    return deparment[0];
  }
  async searchDepartment(value: string, type: string) {
    const departments = await this.departmentSchema.aggregate([
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
          from: 'employees',
          localField: 'manager',
          foreignField: '_id',
          as: 'managerDetails',
        },
      },
      {
        $unwind: '$managerDetails',
      },
      {
        $addFields: {
          'manager.fullName': '$managerDetails.fullName',
          managerName: '$managerDetails.fullName',
        },
      },
      {
        $project: {
          managerDetails: 0,
        },
      },
    ]);

    return departments;
  }
  async deleteDepartment(departmentId: Types.ObjectId) {
    return await this.departmentSchema.findByIdAndDelete(departmentId);
  }
  async updateManager(oldManager: Types.ObjectId, newManager: Types.ObjectId) {
    const updateDepartment = await this.departmentSchema.findOneAndUpdate(
      {
        manager: oldManager,
      },
      {
        manager: newManager,
      },
    );
    const updateOldManager = await this.employeeSchema.findByIdAndUpdate(
      oldManager,
      {
        role: Role.EMPLOYEE,
      },
    );
    await updateOldManager.save();
    const updateNewManager = await this.employeeSchema.findByIdAndUpdate(
      newManager,
      {
        role: Role.EMPLOYEE,
      },
    );
    await updateNewManager.save();
    return await updateDepartment.save();
  }
}
