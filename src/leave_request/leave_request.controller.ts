import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';
import { Types } from 'mongoose';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/employee/enum/roles.enum';

@Controller('leave-request')
export class LeaveRequestController {
  constructor(private leaveRequestService: LeaveRequestService) {}
  @Get('/getAllLeaveRequest')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  async getAllLeaveRequest(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.leaveRequestService.getAllLeaveRequest(page, size, sort, order);
  }
  @Post('/createLeaveRequest/:id')
  async createLeaveRequest(@Query('id') id: string, @Body() body: any) {
    return this.leaveRequestService.createLeaveRequest({
      employeeId: id,
      ...body,
    });
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DEPARTMENT_MANAGER)
  @Get('/approveLeaveRequest/:id')
  async approveLeaveRequest(@Query('id') id: string) {
    return this.leaveRequestService.approveLeaveRequest(new Types.ObjectId(id));
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.DEPARTMENT_MANAGER)
  @Get('/rejectLeaveRequest/:id')
  async rejectLeaveRequest(@Query('id') id: string) {
    return this.leaveRequestService.rejectLeaveRequest(new Types.ObjectId(id));
  }
  @Get('/rejectLeaveRequest/:id')
  async getAllMyLeaveRequest(@Query('id') id: string) {
    return this.leaveRequestService.getAllMyLeaveRequest(
      new Types.ObjectId(id),
    );
  }
}
