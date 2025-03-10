import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OvertimeRecordService } from './overtime_record.service';
import { Types } from 'mongoose';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/employee/enum/roles.enum';

@Controller('overtime-record')
export class OvertimeRecordController {
  constructor(private overtimeRecordService: OvertimeRecordService) {}
  @Post('createOverTimeRecord')
  async createOverTimeRecord(@Body() data: any) {
    return this.overtimeRecordService.createOverTimeRecord(data);
  }
  @Get('getTotalOverTimeInMonth')
  async getTotalOverTimeInMonth(@Query('month') month: string) {
    return this.overtimeRecordService.getTotalOverTimeInMonth(month);
  }
  @Get('getAllOvertimeRecord')
  async getAllOvertimeRecord(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.overtimeRecordService.getAllOvertimeRecord(
      page,
      size,
      sort,
      order,
    );
  }
  @UseGuards(RolesGuard)
  @Roles(Role.DEPARTMENT_MANAGER, Role.ADMIN)
  @Get('approveOTRecord/:id')
  async approveOTRecord(@Query('id') id: string) {
    return this.overtimeRecordService.approveOTRecord(new Types.ObjectId(id));
  }
  @UseGuards(RolesGuard)
  @Roles(Role.DEPARTMENT_MANAGER, Role.ADMIN)
  @Get('rejectOTRecord/:id')
  async rejectOTRecord(@Query('id') id: string) {
    return this.overtimeRecordService.rejectOTRecord(new Types.ObjectId(id));
  }
  @Get('getAllMyOTRecord/:id')
  async getAllMyOTRecord(@Query('id') id: string) {
    return this.overtimeRecordService.getAllMyOTRecord(new Types.ObjectId(id));
  }
  @Get('getTotalOvertimeHoursInMonthByEmployee')
  async getTotalOvertimeHoursInMonthByEmployee(
    @Query('month') month: string,
    @Query('employeeId') employeeId: string,
  ) {
    return this.overtimeRecordService.getTotalOvertimeHoursInMonthByEmployee(
      new Types.ObjectId(employeeId),
      month,
    );
  }
}
