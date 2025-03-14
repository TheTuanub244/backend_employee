import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Department } from './department.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name)
    private departmentSchema: Model<Department>,
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
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const getAllDepartment = await this.departmentSchema.aggregate([
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
          'manager.name': '$managerDetails.name',
          managerName: '$managerDetails.name',
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
    ]);
    const countAllDepartment = await this.departmentSchema.countDocuments();
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
        $unwind: '$managerDetails',
      },
      {
        $addFields: {
          'manager.name': '$managerDetails.name',
          managerName: '$managerDetails.name',
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
          'manager.name': '$managerDetails.name',
          managerName: '$managerDetails.name',
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
    return await this.departmentSchema.findByIdAndUpdate(oldManager, {
      manager: newManager,
    });
  }
}
