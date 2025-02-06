import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
export enum DocumentType {
  CONTRACT = 'CONTRACT',
  PROBATION_CONTRACT = 'PROBATION_CONTRACT',
  SERVICE_CONTRACT = 'SERVICE_CONTRACT',
  IDENTITY_CARD = 'IDENTITY_CARD',
  PASSPORT = 'PASSPORT',
  DRIVER_LICENSE = 'DRIVER_LICENSE',
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
  SOCIAL_INSURANCE = 'SOCIAL_INSURANCE',
  UNEMPLOYMENT_INSURANCE = 'UNEMPLOYMENT_INSURANCE',
  DEGREE = 'DEGREE',
  CERTIFICATE = 'CERTIFICATE',
  TRAINING_CERTIFICATE = 'TRAINING_CERTIFICATE',
  OFFER_LETTER = 'OFFER_LETTER',
  PROMOTION_DECISION = 'PROMOTION_DECISION',
  RESIGNATION_LETTER = 'RESIGNATION_LETTER',
  DISCIPLINARY_DECISION = 'DISCIPLINARY_DECISION',
  MEDICAL_CERTIFICATE = 'MEDICAL_CERTIFICATE',
  TAX_DOCUMENT = 'TAX_DOCUMENT',
  OTHER = 'OTHER',
}
@Schema({ timestamps: true })
export class Document {
  @Prop({ required: true, type: mongoose.Schema.ObjectId, ref: 'Employee' })
  employeeId: Employee;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  issuedBy: string;
  @Prop({ required: true, type: Date })
  issuedDate: Date;
  @Prop({ required: true })
  fileUrl: string;
  @Prop({
    required: true,
    enum: DocumentType,
    default: DocumentType.CERTIFICATE,
  })
  documentType: DocumentType;
}
export const DocumentSchema = SchemaFactory.createForClass(Document);
