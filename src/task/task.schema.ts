import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
import { Project } from 'src/project/project.schema';
export enum Status {
  PENDING = 'PENDING',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}
export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}
@Schema({ timestamps: true })
export class Task {
  @Prop({
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    index: true,
  })
  projectId: Project;
  @Prop({
    required: true,
    type: mongoose.Schema.ObjectId,
    ref: 'Employee',
    index: true,
  })
  assignedTo: Employee;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: false })
  dueDate: Date;
  @Prop({ required: true, enum: Status, default: Status.PENDING, index: true })
  status: Status;
  @Prop({ required: true, enum: Priority, default: Priority.LOW, index: true })
  priority: Priority;
}
export const TaskSchema = SchemaFactory.createForClass(Task);
