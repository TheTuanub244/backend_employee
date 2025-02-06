import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';

@Schema({ timestamps: true })
export class Department {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Employee' })
  manager: Employee;
}
export const DepartmentSchema = SchemaFactory.createForClass(Department);
