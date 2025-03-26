import { Module } from '@nestjs/common';
import { MealMenuService } from './meal_menu.service';
import { MealMenuController } from './meal_menu.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MealMenu, MealMenuSchema } from './meal_menu.schema';

@Module({
  controllers: [MealMenuController],
  providers: [MealMenuService],
  imports: [
    MongooseModule.forFeature([
      {
        name: MealMenu.name,
        schema: MealMenuSchema,
      },
    ]),
  ],
})
export class MealMenuModule {}
