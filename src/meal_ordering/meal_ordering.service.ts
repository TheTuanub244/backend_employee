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
    const date = new Date(createMealOrderingDto.date);
    createMealOrderingDto.employeeId = new Types.ObjectId(
      createMealOrderingDto.employeeId,
    );
    const findMeal = await this.mealOrderingSchema.findOne({
      employeeId: createMealOrderingDto.employeeId,
      date,
    });
    const findMenu = await this.mealMenuSchema.findById(
      new Types.ObjectId(createMealOrderingDto.menuId),
    );
    createMealOrderingDto.price =
      Number(findMenu.price) * Number(createMealOrderingDto.quantity);
    if (findMeal) {
      const updateMeal = await findMeal.updateOne(createMealOrderingDto);
      return updateMeal;
    }

    createMealOrderingDto.menuId = new Types.ObjectId(
      createMealOrderingDto.menuId,
    );

    const newMealOrder = new this.mealOrderingSchema(createMealOrderingDto);
    return await newMealOrder.save();
  }
  async getAllOrderInOneDay(date: Date) {
    date = new Date(date);
    const currentDay = date.getDay();
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - currentDay + (currentDay === 0 ? 1 : 1));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    const orders = await this.mealOrderingSchema
      .find({
        date: { $gte: startDate, $lte: endDate },
      })
      .populate('menuId')
      .populate({
        path: 'employeeId',
        populate: {
          path: 'department',
        },
      })
      .exec();
    const daysOfWeek = [
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const result = [];
    for (let i = 0; i < 6; i++) {
      const orderForDay = [];

      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dateString = currentDate.toISOString().split('T')[0];
      const dayName = daysOfWeek[i];
      let total = 0;

      await Promise.all(
        orders.map((order) => {
          console.log(order);
          if (order.date.toISOString().split('T')[0] === dateString) {
            total += order.quantity;
            orderForDay.push({
              quantity: order.quantity,
              fullName: order.employeeId.fullName,
              department: order.employeeId.department.name,
              email: order.employeeId.email,
              phoneNumber: order.employeeId.phoneNumber,
            });
          }
        }),
      );
      result.push({
        day: dayName,
        date: dateString,
        order: {
          total,
          info: orderForDay,
        },
      });
    }
    return result;
  }
  async getMyOrder(employeeId: Types.ObjectId) {
    const today = new Date();
    const currentDay = today.getDay();

    const startDate = new Date(today);
    startDate.setDate(
      today.getDate() - currentDay + (currentDay === 0 ? 1 : 1),
    );
    console.log(startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    const weeklyMenus = await this.mealMenuSchema
      .find({
        date: { $gte: startDate, $lte: endDate },
      })
      .lean()
      .exec();
    const orders = await this.mealOrderingSchema
      .find({
        employeeId,
        date: { $gte: startDate, $lte: endDate },
      })
      .populate('menuId')
      .exec();
    const daysOfWeek = [
      'Thứ Hai',
      'Thứ Ba',
      'Thứ Tư',
      'Thứ Năm',
      'Thứ Sáu',
      'Thứ Bảy',
    ];
    const result = [];
    for (let i = 0; i < 6; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      const dateString = currentDate.toISOString().split('T')[0];
      const dayName = daysOfWeek[i];

      const menuForDay = weeklyMenus.find(
        (menu) => menu.date.toISOString().split('T')[0] === dateString,
      );

      const orderForDay = orders.find(
        (order) => order.date.toISOString().split('T')[0] === dateString,
      );
      result.push({
        day: dayName,
        date: dateString,
        menu: menuForDay
          ? {
              _id: menuForDay._id,
              items: menuForDay.items,
              price: menuForDay.price,
            }
          : null,
        order: orderForDay
          ? {
              quantity: orderForDay.quantity || 1,
              totalPrice:
                orderForDay.menuId.price * (orderForDay.quantity || 1),
            }
          : null,
      });
    }
    console.log(result);
    return {
      weekRange: {
        start: startDate.toISOString().split('T')[0],
        end: endDate.toISOString().split('T')[0],
      },
      weeklyData: result,
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
