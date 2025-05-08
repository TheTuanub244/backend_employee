import { Injectable } from '@nestjs/common';
import { Meeting } from './meeting.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name)
    private meetingSchema: Model<Meeting>,
  ) {}
  async createMeeting(meeting: any): Promise<Meeting> {
    const newMeeting = new this.meetingSchema(meeting);
    return await newMeeting.save();
  }
  async getAllMeetingByDepartmentAndStatus(
    page: number,
    size: number,
    field: string,
    order: string,
    departmentId: string,
    status: string,
  ) {
    const skip = (page - 1) * size;
    const sortOrder = order === 'ASC' ? 1 : -1;
    size = Number(size);
    const pipeline: any[] = [
      {
        $lookup: {
          from: 'departments',
          localField: 'department',
          foreignField: '_id',
          as: 'departmentDetails',
        },
      },
      {
        $unwind: {
          path: '$departmentDetails',
        },
      },
      {
        $addFields: {
          'department.name': '$departmentDetails.name',
          'department._id': '$departmentDetails._id',
          'department.manager': '$departmentDetails.manager',
        },
      },
      {
        $project: {
          departmentDetails: 0,
        },
      },
    ];
    if (!departmentId && !status) {
      const countMeetings = await this.meetingSchema.aggregate(pipeline);
      const totalCount = countMeetings.length;
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
      const meetings = await this.meetingSchema.aggregate(pipeline);
      return {
        data: meetings,
        totalCount,
      };
    } else {
      pipeline.push({
        $match: {
          $and: [
            {
              'department._id': new Types.ObjectId(departmentId),
              status: status,
            },
          ],
        },
      });
      const countMeetings = await this.meetingSchema.aggregate(pipeline);
      const totalCount = countMeetings.length;

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
      const properties = await this.meetingSchema.aggregate(pipeline);
      return {
        data: properties,
        totalCount,
      };
    }
  }
  async approveMeeting(id: string): Promise<Meeting> {
    const meeting = await this.meetingSchema.findByIdAndUpdate(
      id,
      { status: 'APPROVED' },
      { new: true },
    );
    return meeting;
  }
  async rejectMeeting(id: string): Promise<Meeting> {
    const meeting = await this.meetingSchema.findByIdAndUpdate(
      id,
      { status: 'REJECTED' },
      { new: true },
    );
    return meeting;
  }
}
