import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { Meeting, MeetingSchema } from './meeting.schema';
import { Department, DepartmentSchema } from 'src/department/department.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MeetingController],
  providers: [MeetingService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Meeting.name,
        schema: MeetingSchema,
      },

      {
        name: Department.name,
        schema: DepartmentSchema,
      },
    ]),
  ],
})
export class MeetingModule {}
