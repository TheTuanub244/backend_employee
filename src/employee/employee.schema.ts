import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department } from 'src/department/department.schema';
import { Role } from './enum/roles.enum';

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
  @Prop({ required: true })
  userName: string;
  @Prop({ required: true })
  password: string;
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
  @Prop({ required: true, enum: Role, default: Role.EMPLOYEE })
  role: Role;
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
}
export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.index({ department: 1, position: 1 });
EmployeeSchema.index({ fullName: 1, dob: -1 });
