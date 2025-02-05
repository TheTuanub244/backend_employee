import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Contract } from 'src/contract/contract.schema';
import { Department } from 'src/department/department.schema';
import { Document } from 'src/document/document.schema';

export enum Position {
  INTERN = 'INTERN',
  STAFF = 'STAFF',
  SENIOR_STAFF = 'SENIOR_STAFF',
  TEAM_LEAD = 'TEAM_LEAD',
  MANAGER = 'MANAGER',
  DIRECTOR = 'DIRECTOR',
  CEO = 'CEO',
  FREELANCER = 'FREELANCER',
  OTHER = 'OTHER',
}

@Schema()
export class Employee {
  @Prop({ required: true })
  fullName: string;
  @Prop({ required: true, type: Date })
  dob: Date;
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Department' })
  department: Department;
  @Prop({ required: true, enum: Position, default: Position.INTERN })
  position: Position;
  //   @Prop({required: true, type: mongoose.Schema.ObjectId, ref: ''})
  //   workHistory: ;
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Document' })
  documents: Document;
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Contract' })
  contracts: Contract;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);
