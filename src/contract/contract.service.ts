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
    value: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    size = Number(size);
    const types = ['employeeName', 'contractType', 'status'];
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'employees',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employeeDetails',
        },
      },
      {
        $unwind: '$employeeDetails',
      },
      {
        $addFields: {
          'employeeId.fullName': '$employeeDetails.fullName',
          'employeeId._id': '$employeeDetails._id',
          'employeeId.phoneNumber': '$employeeDetails.phoneNumber',
          'employeeId.email': 'employeeDetails.email'
        },
      },
      {
        $project: {
          employeeDetails: 0,
        },
      },
    ];
    if (value) {
      pipeline.push({
        $match: {
          $or: types.map((type) => ({
            [type]: {
              $regex: value,
              $options: 'i',
            },
          })),
        },
      });
      const countContracts = await this.contractSchema.aggregate(pipeline);
      const totalCount = countContracts.length;

      pipeline.push(
        {
          $sort: {
            [field]: sortOrder,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: size,
        },
      );
      const contracts = await this.contractSchema.aggregate(pipeline);
      return {
        data: contracts,
        totalCount,
      };
    } else {
      const countContracts = await this.contractSchema.aggregate(pipeline);
      const totalCount = countContracts.length;
      pipeline.push(
        {
          $sort: {
            [field]: sortOrder,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: size,
        },
      );
      const contracts = await this.contractSchema.aggregate(pipeline);
      return {
        data: contracts,
        totalCount,
      };
    }
  }
  async getContractById(contractId: Types.ObjectId) {
    const contract = await this.contractSchema.aggregate([
      {
        $match: {
          _id: contractId,
        },
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'employeeId',
          foreignField: '_id',
          as: 'employeeDetails',
        },
      },
      {
        $unwind: {
          path: '$employeeDetails',
        },
      },
      {
        $addFields: {
          'employeeId.fullName': '$employeeDetails.fullName',
          'employeeId._id': '$employeeDetails._id',
          'employeeId.phoneNumber': '$employeeDetails.phoneNumber',
          'employeeId.email': 'employeeDetails.email'
        },
      },
      {
        $project: {
          password: 0,
          employeeDetails: 0,
        },
      },
    ]);
    return {
      data: contract,
    };
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
