import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealOrderingService } from './meal_ordering.service';
import { CreateMealOrderingDto } from './dto/create-meal_ordering.dto';
import { UpdateMealOrderingDto } from './dto/update-meal_ordering.dto';

@Controller('meal-ordering')
export class MealOrderingController {
  constructor(private readonly mealOrderingService: MealOrderingService) {}

  @Post()
  create(@Body() createMealOrderingDto: CreateMealOrderingDto) {
    return this.mealOrderingService.create(createMealOrderingDto);
  }

  @Get()
  findAll() {
    return this.mealOrderingService.findAll();
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
