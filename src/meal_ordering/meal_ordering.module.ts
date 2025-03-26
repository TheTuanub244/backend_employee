import { Module } from '@nestjs/common';
import { MealOrderingService } from './meal_ordering.service';
import { MealOrderingController } from './meal_ordering.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealOrdering, MealOrderingSchema } from './meal_ordering.schema';
import { MealMenu, MealMenuSchema } from 'src/meal_menu/meal_menu.schema';

@Module({
  controllers: [MealOrderingController],
  providers: [MealOrderingService],
  imports: [
    MongooseModule.forFeature([
      {
        name: MealOrdering.name,
        schema: MealOrderingSchema,
      },
      {
        name: MealMenu.name,
        schema: MealMenuSchema,
      },
    ]),
  ],
})
export class MealOrderingModule {}
