import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskSchema: Model<Task>,
  ) {}
  async createTask(createTaskDto: any) {
    const newTask = new this.taskSchema(createTaskDto);
    return await newTask.save();
  }

  findAll() {
    return `This action returns all task`;
  }

  async getAllTask(
    page: number,
    size: number,
    field: string,
    order: string,
    value: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const types = ['assignedTo', 'projectName', 'title', 'status'];
    size = Number(size);
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'Projects',
          localField: 'projectId',
          foreignField: '_id',
          as: 'projectDetails',
        },
      },
      {
        $unwind: { path: '$projectDetails', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          'projectId.name': '$projectDetails.name',
          projectName: '$projectDetails.name',
        },
      },
      {
        $lookup: {
          from: 'Employees',
          localField: 'assignedTo',
          foreignField: '_id',
          as: 'employeeDetails',
        },
      },
      {
        $unwind: '$employeeDetails',
      },
      {
        $addFields: {
          'assignedTo.name': '$employeeDetails.name',
          assignedTo: '$employeeDetails.name',
        },
      },
    ];
    if (value) {
      pipeline.push({
        $match: {
          $or: types.map((type) => ({
            [type]: {
              $regex: value,
              $options: 'i',
            },
          })),
        },
      });
    }
    pipeline.push(
      {
        $sort: {
          [field]: sortOrder,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: size,
      },
    );
    const getAllTask = await this.taskSchema.aggregate(pipeline);
    const countGetAllAttendanceRecord = await this.taskSchema.countDocuments();
    return {
      data: getAllTask,
      totalCount: countGetAllAttendanceRecord,
    };
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
