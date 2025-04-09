import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MealOrderingService } from './meal_ordering.service';
import { CreateMealOrderingDto } from './dto/create-meal_ordering.dto';
import { UpdateMealOrderingDto } from './dto/update-meal_ordering.dto';
import { Types } from 'mongoose';

@Controller('meal-ordering')
export class MealOrderingController {
  constructor(private readonly mealOrderingService: MealOrderingService) {}

  @Post('orderMeal')
  orderMeal(@Body() createMealOrderingDto: any) {
    return this.mealOrderingService.orderMeal(createMealOrderingDto);
  }

  @Get('getMyOrder/:id')
  getMyOrder(@Param('id') id: string) {
    return this.mealOrderingService.getMyOrder(new Types.ObjectId(id));
  }
  @Get('getAllOrderInOneDay')
  getAllOrderInOneDay(@Query('date') date: Date){
    return this.mealOrderingService.getAllOrderInOneDay(date)
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealOrderingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealOrderingDto: UpdateMealOrderingDto) {
    return this.mealOrderingService.update(+id, updateMealOrderingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealOrderingService.remove(+id);
  }
}
