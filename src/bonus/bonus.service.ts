import { Injectable } from '@nestjs/common';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bonus } from './bonus.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class BonusService {
  constructor(
    @InjectModel(Bonus.name)
    private bonusSchema: Model<Bonus>,
  ) {}
  async createBonus(bonusDto: any) {
    const fixDate = new Date(bonusDto.month);
    fixDate.setUTCHours(0, 0, 0, 0);
    const newBonus = new this.bonusSchema({
      name: bonusDto.name,
      amount: bonusDto.amount,
      employeeId: bonusDto.employeeId,
      month: fixDate,
    });
    return await newBonus.save();
  }
  async getTotalBonus(employeeId: Types.ObjectId, month: string) {
    const bonuses = await this.bonusSchema.find({
      employeeId: new Types.ObjectId(employeeId),
      month,
    });
    return bonuses.reduce((total, bonus) => total + bonus.amount, 0);
  }
  async getAllBonus(page: number, size: number, field: string, order: string) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const getAllBonus = await this.bonusSchema
      .find()
      .populate('employeeId')
      .skip(skip)
      .limit(size)
      .sort({
        [field]: sortOrder,
      });
    const countAllBonus = await this.bonusSchema.countDocuments();

    return {
      totalCount: countAllBonus,
      data: getAllBonus,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} bonus`;
  }

  update(id: number, updateBonusDto: UpdateBonusDto) {
    return `This action updates a #${id} bonus`;
  }

  remove(id: number) {
    return `This action removes a #${id} bonus`;
  }
}
