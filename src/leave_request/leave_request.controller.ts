import { Controller, Query } from '@nestjs/common';
import { LeaveRequestService } from './leave_request.service';

@Controller('leave-request')
export class LeaveRequestController {
  constructor(private leaveRequestService: LeaveRequestService) {}
  async getAllLeaveRequest(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.leaveRequestService.getAllLeaveRequest(page, size, sort, order);
  }
}
