import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';

@Schema({ timestamps: true })
export class Project {
  @Prop({ required: true })
  projectName: string;
  @Prop({ required: true, type: Date })
  startDate: Date;
  @Prop({ required: true, type: Date })
  endDate: Date;
  @Prop({})
  description: string;
  @Prop({})
  process: number;
  @Prop({
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    index: true,
  })
  managerId: Employee;
}
export const ProjectSchema = SchemaFactory.createForClass(Project);
