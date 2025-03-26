import { Injectable } from '@nestjs/common';
import { CreateMealOrderingDto } from './dto/create-meal_ordering.dto';
import { UpdateMealOrderingDto } from './dto/update-meal_ordering.dto';

@Injectable()
export class MealOrderingService {
  create(createMealOrderingDto: CreateMealOrderingDto) {
    return 'This action adds a new mealOrdering';
  }

  findAll() {
    return `This action returns all mealOrdering`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mealOrdering`;
  }

  update(id: number, updateMealOrderingDto: UpdateMealOrderingDto) {
    return `This action updates a #${id} mealOrdering`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealOrdering`;
  }
}
