import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './property.schema';
import { Model, ObjectId, Types } from 'mongoose';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private propertySchema: Model<Property>,
  ) {}
  async getAllProperty(
    page: number,
    size: number,
    field: string,
    order: string,
    value: string,
  ) {
    const skip = (page - 1) * size;
    const types = ['department.name', 'status', 'name'];
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
        },
      },
      {
        $addFields: {
          'department.name': '$departmentDetails.name',
          'department._id': '$departmentDetails._id',
          'department.manager': '$departmentDetails.manager',
        },
      },
      {
        $project: {
          departmentDetails: 0,
        },
      },
    ];
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
      const countProperties = await this.propertySchema.aggregate(pipeline);
      const totalCount = countProperties.length;

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
      const properties = await this.propertySchema.aggregate(pipeline);
      return {
        data: properties,
        totalCount,
      };
    } else {
      const countProperties = await this.propertySchema.aggregate(pipeline);
      const totalCount = countProperties.length;
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
      const properties = await this.propertySchema.aggregate(pipeline);
      return {
        data: properties,
        totalCount,
      };
    }
  }
  async createProperty({ department, name, status, number }) {
    const newProperty = new this.propertySchema({
      department,
      name,
      status,
      number,
    });
    return await newProperty.save();
  }
  async requestMaintenance(propertyId) {
    const updateProperty = await this.propertySchema.findByIdAndUpdate(
      propertyId,
      {
        status: 'PENDING',
      },
    );
    return await updateProperty.save();
  }
  async acceptMaintaince(propertyId) {
    const updateProperty = await this.propertySchema.findByIdAndUpdate(
      propertyId,
      {
        status: 'MAINTAINING',
      },
    );
    return await updateProperty.save();
  }
  async returnProperty(propertyId) {
    const updateProperty = await this.propertySchema.findByIdAndUpdate(
      propertyId,
      {
        status: 'ACTIVE',
      },
    );
    return await updateProperty.save();
  }
  async getAllPropertyByDepartment(departmentId) {
    return await this.propertySchema.find({
      department: departmentId,
    });
  }
  async getAllPropertyByDepartmentAndStatus(
    page: number,
    size: number,
    field: string,
    order: string,
    departmentId: string,
    status: string,
    value: string,
  ) {
    const skip = (page - 1) * size;
    const types = ['name'];
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
        },
      },
      {
        $addFields: {
          'department.name': '$departmentDetails.name',
          'department._id': '$departmentDetails._id',
          'department.manager': '$departmentDetails.manager',
        },
      },
      {
        $project: {
          departmentDetails: 0,
        },
      },
    ];
    if (!departmentId && !status && !value) {
      const countProperties = await this.propertySchema.aggregate(pipeline);
      const totalCount = countProperties.length;
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
      const properties = await this.propertySchema.aggregate(pipeline);
      return {
        data: properties,
        totalCount,
      };
    } else if (departmentId && status && !value) {
      pipeline.push({
        $match: {
          $and: [
            {
              'department._id': new Types.ObjectId(departmentId),
              status: status,
            },
          ],
        },
      });
      const countProperties = await this.propertySchema.aggregate(pipeline);
      const totalCount = countProperties.length;

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
      const properties = await this.propertySchema.aggregate(pipeline);
      return {
        data: properties,
        totalCount,
      };
    } else {
      pipeline.push({
        $match: {
          $and: [
            {
              'department._id': new Types.ObjectId(departmentId),
              status: status,
              $or: types.map((type) => ({
                [type]: {
                  $regex: value,
                  $options: 'i',
                },
              })),
            },
          ],
        },
      });
      const countProperties = await this.propertySchema.aggregate(pipeline);
      const totalCount = countProperties.length;

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
      const properties = await this.propertySchema.aggregate(pipeline);
      return {
        data: properties,
        totalCount,
      };
    }
  }
}
