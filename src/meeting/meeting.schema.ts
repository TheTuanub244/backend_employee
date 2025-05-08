import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Department } from 'src/department/department.schema';

export enum Status {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  CANCELLED = 'CANCELLED',
}

@Schema({ timestamps: true })
export class Meeting {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({
    required: false,
    type: Types.ObjectId,
    ref: 'Department',
    index: true,
  })
  department: Department;
  @Prop({ required: true, type: Date, index: true })
  date: Date;
  @Prop({
    required: true,
    enum: Status,
    default: Status.PENDING,
    index: true,
  })
  status: Status;
}
export const MeetingSchema = SchemaFactory.createForClass(Meeting);
