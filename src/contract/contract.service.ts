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
  async getAllContract() {
    return await this.contractSchema.find();
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
