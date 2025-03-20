import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from './project.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name)
    private readonly projectSchema: Model<Project>,
  ) {}
  async createProject(createProjectDto: any) {
    const newProject = new this.projectSchema(createProjectDto);
    return await newProject.save();
  }

  async getAllProject(
    page: number,
    size: number,
    field: string,
    order: string,
    value: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    const types = ['projectName', 'managerName'];
    size = Number(size);
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'employees',
          localField: 'managerId',
          foreignField: '_id',
          as: 'managerDetails',
        },
      },
      {
        $unwind: { path: '$managerDetails', preserveNullAndEmptyArrays: true },
      },
      {
        $addFields: {
          'managerId.name': '$managerDetails.name',
          managerName: '$managerDetails.name',
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
    const getAllProject = await this.projectSchema.aggregate(pipeline);
    const countGetAllAttendanceRecord = getAllProject.length;
    return {
      data: getAllProject,
      totalCount: countGetAllAttendanceRecord,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
