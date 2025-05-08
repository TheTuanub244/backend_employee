import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { MeetingService } from './meeting.service';

@Controller('meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}
  @Post('createMeeting')
  async createMeeting(@Body() body: any) {
    return await this.meetingService.createMeeting(body);
  }
  @Get('getAllMeetingByDepartmentAndStatus')
  async getAllMeetingByDepartmentAndStatus(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('field') field: string,
    @Query('order') order: string,
    @Query('departmentId') departmentId: string,
    @Query('status') status: string,
  ) {
    return await this.meetingService.getAllMeetingByDepartmentAndStatus(
      page,
      size,
      field,
      order,
      departmentId,
      status,
    );
  }
  @Get('approveMeeting')
  async approveMeeting(@Query('meetingId') meetingId: string) {
    return await this.meetingService.approveMeeting(meetingId);
  }
  @Get('rejectMeeting')
  async rejectMeeting(@Query('meetingId') meetingId: string) {
    return await this.meetingService.rejectMeeting(meetingId);
  }
}
