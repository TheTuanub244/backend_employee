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
    const getAllDepartment = await this.departmentSchema
      .find()
      .skip(skip)
      .limit(size)
      .sort({
        [field]: sortOrder,
      });
    const countAllDepartment = await this.departmentSchema.countDocuments();
    return {
      totalCount: countAllDepartment,
      data: getAllDepartment,
    };
  }
  async getDepartmentById(departmentId: Types.ObjectId) {
    return await this.departmentSchema.findById(departmentId);
  }
  async searchDepartmentByName(name: string) {
    return await this.departmentSchema.find({
      name: {
        $regex: name,
        $option: 'i',
      },
    });
  }
  async getDepartmentByManager(manager: Types.ObjectId) {
    return await this.departmentSchema.find({
      manager,
    });
  }
  async deleteDepartment(departmentId: Types.ObjectId) {
    return await this.departmentSchema.findByIdAndDelete(departmentId);
  }
  async updateManager(oldManager: Types.ObjectId, newManager: Types.ObjectId) {
    return await this.departmentSchema.findByIdAndUpdate(oldManager, {
      manager: newManager,
    });
  }
  //   async updateName()
}
