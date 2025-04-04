import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document } from './document.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class DocumentService {
  constructor(
    @InjectModel(Document.name)
    private documentSchema: Model<Document>,
  ) {}
  async getAllDocument(
    page: number,
    size: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    return await this.documentSchema
      .find()
      .skip(skip)
      .limit(size)
      .sort({
        [field]: sortOrder,
      });
  }
  async getDocumentById(documentId: Types.ObjectId) {
    return await this.documentSchema.findById(documentId);
  }
  async getDocumentByEmployee(employeeId: Types.ObjectId) {
    return await this.documentSchema.find({
      employeeId,
    });
  }
  async createDocument({
    employeeId,
    title,
    issuedBy,
    issuedDate,
    fileUrl,
    documentType,
  }) {
    const newDocument = new this.documentSchema({
      employeeId,
      issuedBy,
      issuedDate,
      title,
      fileUrl,
      documentType,
    });
    return await newDocument.save();
  }
  async searchDocumentByTitle(title: string) {
    return await this.documentSchema.find({
      title: {
        $regex: title,
        $options: 'i',
      },
    });
  }
  async searchDocumentByType(type: string) {
    return await this.documentSchema.find({
      documentType: type,
    });
  }
  async deleteDocumentById(documentId: Types.ObjectId) {
    return await this.documentSchema.findByIdAndDelete(documentId);
  }
}
