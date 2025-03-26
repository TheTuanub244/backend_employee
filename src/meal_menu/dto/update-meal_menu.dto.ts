import { PartialType } from '@nestjs/mapped-types';
import { CreateMealMenuDto } from './create-meal_menu.dto';

export class UpdateMealMenuDto extends PartialType(CreateMealMenuDto) {}
