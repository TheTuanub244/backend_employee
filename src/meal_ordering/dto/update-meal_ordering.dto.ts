import { PartialType } from '@nestjs/mapped-types';
import { CreateMealOrderingDto } from './create-meal_ordering.dto';

export class UpdateMealOrderingDto extends PartialType(CreateMealOrderingDto) {}
