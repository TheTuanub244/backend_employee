import { Module } from '@nestjs/common';
import { MealOrderingService } from './meal_ordering.service';
import { MealOrderingController } from './meal_ordering.controller';

@Module({
  controllers: [MealOrderingController],
  providers: [MealOrderingService],
})
export class MealOrderingModule {}
