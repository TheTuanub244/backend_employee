import { Injectable } from '@nestjs/common';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Deduction } from './deduction.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class DeductionService {
  constructor(
    @InjectModel(Deduction.name)
    private deductionSchema: Model<Deduction>,
  ) {}
  async createDeduction(deductionDto: any){
    const newDeduction = new this.deductionSchema({
      type: deductionDto.type,
      amount: deductionDto.amount,
      employeeId: deductionDto.employeeId,
      month: deductionDto.month,
      reason: deductionDto.reason
    });
    return await newDeduction.save()
  }
  async getTotalDeduction(employeeId: Types.ObjectId, month: string) {
    const deductions = await this.deductionSchema.find({
      employeeId: new Types.ObjectId(employeeId),
      month,
    });
    return deductions.reduce((total, deduction) => total + deduction.amount, 0);
  }
  findAll() {
    return `This action returns all deduction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} deduction`;
  }

  update(id: number, updateDeductionDto: UpdateDeductionDto) {
    return `This action updates a #${id} deduction`;
  }

  remove(id: number) {
    return `This action removes a #${id} deduction`;
  }
  async;
}
