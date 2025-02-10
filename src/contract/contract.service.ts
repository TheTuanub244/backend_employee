import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contract } from './contract.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract.name)
    private contractSchema: Model<Contract>,
  ) {}
  async getAllContract(
    page: number,
    size: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const getAllContract = await this.contractSchema
      .find()
      .populate('employeeId')
      .skip(skip)
      .limit(size)
      .sort({
        [field]: sortOrder,
      });
    const countAllContract = await this.contractSchema.countDocuments();
    return {
      datta: getAllContract,
      totalCount: countAllContract,
    };
  }
  async getContractById(contractId: Types.ObjectId) {
    return await this.contractSchema.findById(contractId);
  }
  async searchContractByType(type: string) {
    return await this.contractSchema.find({
      contractType: type,
    });
  }
  async searchContractByStatus(status: string) {
    return await this.contractSchema.find({
      status,
    });
  }
  // async searchContractBySignDate(signDate: Date){

  // }
  async createContract({
    employeeId,
    startDate,
    endDate,
    contractType,
    status,
    signDate,
    attachments,
  }) {
    const newContract = new this.contractSchema({
      employeeId,
      startDate,
      endDate,
      contractType,
      status,
      signDate,
      attachments,
    });
    return await newContract.save();
  }
  async deleteContractById(contractId: Types.ObjectId) {
    return await this.contractSchema.findByIdAndDelete(contractId);
  }
}
