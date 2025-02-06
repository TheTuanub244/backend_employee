import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
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

@Schema({ timestamps: true })
export class Employee {
  @Prop({ required: true, index: true })
  fullName: string;
  @Prop({ required: true, type: Date, index: true })
  dob: Date;
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Department',
    index: true,
  })
  department: Department;
  @Prop({
    required: true,
    enum: Position,
    default: Position.INTERN,
    index: true,
  })
  position: Position;
  //   @Prop({required: true, type: Types.ObjectId, ref: ''})
  //   workHistory: ;
  @Prop({ require: true, default: 1500000 })
  baseSalary: number;
  @Prop({
    type: {
      bankName: String,
      accountNumber: String,
    },
  })
  bankAccount: {
    bankName: string;
    accountNumber: string;
  };
  @Prop({
    type: {
      socialInsuranceRate: Number,
      healthInsuranceRate: Number,
      unemploymentInsuranceRate: Number,
    },
  })
  insurance: {
    socialInsuranceRate: number;
    healthInsuranceRate: number;
    unemploymentInsuranceRate: number;
  };

  @Prop()
  taxCode: string;
  @Prop({ required: true, type: Types.ObjectId, ref: 'Document' })
  documents: Document;
  @Prop({ required: true, type: Types.ObjectId, ref: 'Contract' })
  contracts: Contract;
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.index({ department: 1, position: 1 });
EmployeeSchema.index({ fullName: 1, dob: -1 });
