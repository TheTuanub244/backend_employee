import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class MealMenu {
  @Prop({ required: true, type: Date })
  date: Date;
  @Prop({ required: true })
  items: string[];
  @Prop({ required: true })
  price: number;
}
export const MealMenuSchema = SchemaFactory.createForClass(MealMenu);
