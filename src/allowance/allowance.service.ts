import { Injectable } from '@nestjs/common';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Allowance } from './allowance.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AllowanceService {
  constructor(
    @InjectModel(Allowance.name)
    private allowanceSchema: Model<Allowance>,
  ) {}
  async getTotalAllowance(employeeId: Types.ObjectId, month: string) {
    const allowances = await this.allowanceSchema.find({ employeeId, month });
    return allowances.reduce((total, allowance) => total + allowance.amount, 0);
  }
  async createAllowance(createAllowanceDto: any) {
    const fixDate = new Date(createAllowanceDto.month);
    fixDate.setUTCHours(0, 0, 0, 0);
    const newAllowance = new this.allowanceSchema({
      name: createAllowanceDto.name,
      amount: createAllowanceDto.amount,
      employeeId: createAllowanceDto.employeeId,
      month: fixDate,
    });
    return newAllowance.save();
  }

  async getAllAlowance(
    page: number,
    size: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    return await this.allowanceSchema
      .find()
      .skip(skip)
      .limit(size)
      .sort({
        [field]: sortOrder,
      });
  }

  async findOne(id: Types.ObjectId) {
    return await this.allowanceSchema.findById(id);
  }

  // update(id: number, updateAllowanceDto: UpdateAllowanceDto) {
  //   return `This action updates a #${id} allowance`;
  // }

  async removeAllowance(id: Types.ObjectId) {
    return await this.allowanceSchema.findOneAndDelete({
      _id: id,
    });
  }
}
