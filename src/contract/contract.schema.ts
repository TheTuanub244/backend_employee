import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
export enum ContractType {
  PERMANENT = 'PERMANENT',
  FIXED_TERM = 'FIXED_TERM',
  PROBATION = 'PROBATION',
  PART_TIME = 'PART_TIME',
  FREELANCE = 'FREELANCE',
  INTERNSHIP = 'INTERNSHIP',
  SERVICE = 'SERVICE',
  SEASONAL = 'SEASONAL',
}
export enum ContractStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  TERMINATED = 'TERMINATED',
  PENDING = 'PENDING',
}
@Schema()
export class Contract {
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Employee' })
  employeeId: Employee;
  @Prop({ required: true, type: Date })
  startDate: Date;
  @Prop({ type: Date })
  endDate: Date;
  @Prop({
    required: true,
    enum: ContractType,
    default: ContractType.FIXED_TERM,
  })
  contractType: ContractType;
  @Prop({
    required: true,
    enum: ContractStatus,
    default: ContractStatus.ACTIVE,
  })
  status: string;
  @Prop({ required: true, type: Date })
  signDate: Date;
  @Prop({
    type: [
      {
        fileName: String,
        fileUrl: String,
      },
    ],
    default: [],
  })
  attachments: { fileName: string; fileUrl: string }[];
}
export const ContractSchema = SchemaFactory.createForClass(Contract);
