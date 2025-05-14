import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Department } from 'src/department/department.schema';
import { Employee } from 'src/employee/employee.schema';

export enum PropertyStatus {
  ACTIVE = 'ACTIVE',
  MAINTAINING = 'MAINTAINING',
  PENDING = 'PENDING',
}
@Schema({ timestamps: true })
export class Property {
  @Prop({
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Department',
    index: true,
  })
  department: Department;
  @Prop({ required: false })
  name: string;
  @Prop({
    required: true,
    enum: PropertyStatus,
    default: PropertyStatus.ACTIVE,
    index: true,
  })
  status: PropertyStatus;
  @Prop({ required: false })
  number: number;
}

export const PropertySchema = SchemaFactory.createForClass(Property);

PropertySchema.index({ reason: 'text' });
