import { Injectable } from '@nestjs/common';
import { CreateMealOrderingDto } from './dto/create-meal_ordering.dto';
import { UpdateMealOrderingDto } from './dto/update-meal_ordering.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MealOrdering } from './meal_ordering.schema';
import mongoose, { Model, Types } from 'mongoose';
import { MealMenu } from 'src/meal_menu/meal_menu.schema';

@Injectable()
export class MealOrderingService {
  constructor(
    @InjectModel(MealOrdering.name)
    private mealOrderingSchema: Model<MealOrdering>,
    @InjectModel(MealMenu.name)
    private mealMenuSchema: Model<MealMenu>,
  ) {}
  async orderMeal(createMealOrderingDto: any) {
    const findMenu = await this.mealMenuSchema.findById(
      new Types.ObjectId(createMealOrderingDto.menuId),
    );
    createMealOrderingDto.employeeId = new Types.ObjectId(
      createMealOrderingDto.employeeId,
    );
    createMealOrderingDto.menuId = new Types.ObjectId(
      createMealOrderingDto.menuId,
    );

    createMealOrderingDto.price =
      Number(findMenu.price) * Number(createMealOrderingDto.quantity);
    const newMealOrder = new this.mealOrderingSchema(createMealOrderingDto);
    return await newMealOrder.save();
  }

  async getMyOrder(employeeId: Types.ObjectId) {
    const today = new Date();
    const currentDay = today.getDay(); // 0 (Chủ Nhật) -> 6 (Thứ Bảy)

    // Tính ngày bắt đầu (thứ 2) và kết thúc (thứ 6) của tuần hiện tại
    const startDate = new Date(today);
    startDate.setDate(
      today.getDate() - currentDay + (currentDay === 0 ? 1 : 1),
    ); // Luôn là thứ 2

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 4);
    const orders = await this.mealOrderingSchema
      .find({
        employeeId,
        date: { $gte: startDate, $lte: endDate },
      })
      .populate('menuId') // Populate thông tin menu
      .exec();
    const weekDays = [
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const weeklyOrders = {};

    weekDays.forEach((day) => {
      weeklyOrders[day] = {
        ordered: false,
        menu: null,
        quantity: 0,
        totalPrice: 0,
      };
    });

    orders.forEach((order) => {
      const orderDay = order.date.getDay();
      const dayName = weekDays[orderDay - 1];

      weeklyOrders[dayName] = {
        ordered: true,
        menu: order.menuId,
        quantity: order.quantity || 1,
        totalPrice: (order.price || order.menuId.price) * (order.quantity || 1),
      };
    });

    return {
      weekRange: {
        start: startDate.toLocaleDateString('vi-VN'),
        end: endDate.toLocaleDateString('vi-VN'),
      },
      orders: weeklyOrders,
    };
  }
  findOne(id: number) {
    return `This action returns a #${id} mealOrdering`;
  }

  update(id: number, updateMealOrderingDto: UpdateMealOrderingDto) {
    return `This action updates a #${id} mealOrdering`;
  }

  remove(id: number) {
    return `This action removes a #${id} mealOrdering`;
  }
}
