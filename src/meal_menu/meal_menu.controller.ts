import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MealMenuService } from './meal_menu.service';
import { CreateMealMenuDto } from './dto/create-meal_menu.dto';
import { UpdateMealMenuDto } from './dto/update-meal_menu.dto';

@Controller('meal-menu')
export class MealMenuController {
  constructor(private readonly mealMenuService: MealMenuService) {}

  @Post('createMenu')
  createMenu(@Body() createMealMenuDto: any) {
    return this.mealMenuService.createMenu(createMealMenuDto);
  }

  @Get()
  findAll() {
    return this.mealMenuService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mealMenuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMealMenuDto: UpdateMealMenuDto) {
    return this.mealMenuService.update(+id, updateMealMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mealMenuService.remove(+id);
  }
}
