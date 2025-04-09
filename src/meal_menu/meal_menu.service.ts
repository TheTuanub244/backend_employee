import { Injectable } from '@nestjs/common';
import { CreateMealMenuDto } from './dto/create-meal_menu.dto';
import { UpdateMealMenuDto } from './dto/update-meal_menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MealMenu } from './meal_menu.schema';
import { Model } from 'mongoose';

@Injectable()
export class MealMenuService {
  constructor(
    @InjectModel(MealMenu.name)
    private mealMenuSchema: Model<MealMenu>,
  ) {}
  async createMenu(createMealMenuDto: any) {
    const dateObj = new Date(createMealMenuDto.date);
    dateObj.setHours(23, 59, 59, 999);

    const newMenu = new this.mealMenuSchema({
      ...createMealMenuDto,
      date: dateObj,
    });
    return await newMenu.save();
  }
  
  findAll() {
    return `This action returns all mealMenu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealMenu`;
  }

  update(id: number, updateMealMenuDto: UpdateMealMenuDto) {
    return `This action updates a #${id} mealMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealMenu`;
  }
}
