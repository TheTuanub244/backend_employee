import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { Employee } from 'src/employee/employee.schema';
import { MealMenu } from 'src/meal_menu/meal_menu.schema';
@Schema({ timestamps: true })
export class MealOrdering {
  @Prop({ required: true, type: Date })
  date: Date;
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'Employee',
    index: true,
  })
  employeeId: Employee;
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'MealMenu',
    index: true,
  })
  menuId: MealMenu;
  @Prop({ required: false })
  quantity: number;
  @Prop({ required: false })
  price: number;
}
export const MealOrderingSchema = SchemaFactory.createForClass(MealOrdering);
