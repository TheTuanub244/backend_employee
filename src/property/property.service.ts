import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Property } from './property.schema';
import { Model } from 'mongoose';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name)
    private propertySchema: Model<Property>,
  ) {}
  async getAllProperty() {
    return await this.propertySchema.find({});
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
  async getAllPropertyByDepartmentAndStatus(departmentId, status) {
    return await this.propertySchema.find({
      department: departmentId,
      status,
    });
  }
}
