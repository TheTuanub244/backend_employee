import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AttendanceRecordService } from './attendance_record.service';
import { Types } from 'mongoose';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/employee/enum/roles.enum';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('attendance-record')
export class AttendanceRecordController {
  constructor(
    private readonly attendanceRecordService: AttendanceRecordService,
  ) {}
  @Post('/getTotalWorkHoursByEmployee/:id')
  async getTotalWorkHoursByEmployee(
    @Param('id') id: string,
    @Query() month: string,
  ) {
    return this.attendanceRecordService.getTotalWorkHoursByEmployee(
      new Types.ObjectId(id),
      month,
    );
  }
  @Get('/getAllMyAttendanceRecord/:id')
  async getAllMyAttendanceRecord(@Param('id') id: string) {
    return this.attendanceRecordService.getAllMyAttendanceRecord(
      new Types.ObjectId(id),
    );
  }
  @Post('/checkOut/:id')
  async checkOut(@Param('id') id: string, @Body() body: any) {
    return this.attendanceRecordService.checkOut(
      new Types.ObjectId(id),
      body.check_out_hour,
      body.note,
    );
  }
  @Post('/checkIn/:id')
  async checkIn(@Param('id') id: string, @Body() body: any) {
    return this.attendanceRecordService.checkIn(
      new Types.ObjectId(id),
      body.check_in_hour,
      body.work_hour,
    );
  }
  @Post('createAttendanceRecordByAdmin')
  async createAttendanceRecordByAdmin(@Body() data: any) {
    return this.attendanceRecordService.createAttendanceRecordByAdmin(
      data.attendanceRecordDto,
    );
  }
  @Post('/getTotalWorkHoursByMonth/:id')
  async getTotalWorkHoursByMonth(@Query() month: string) {
    return this.attendanceRecordService.getTotalWorkHoursByMonth(month);
  }
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Get('getAllAttendanceRecord')
  async getAllAttendanceRecord(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('value') value: string,
    @Query('status') status: string,
  ) {
    return this.attendanceRecordService.getAllAttendanceRecord(
      page,
      size,
      sort,
      order,
      value,
      status,
    );
  }
  @Get('findCheckIn')
  async findCheckIn(@Query('employeeId') employeeId: string) {
    return this.attendanceRecordService.findCheckIn(employeeId);
  }
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get('searchAttendanceRecordByDate')
  async searchAttendanceRecordByDate(
    @Query('checkIn') checkIn: Date,
    @Query('checkOut') checkOut: Date,
  ) {
    return this.attendanceRecordService.searchAttendanceRecordByDate(
      checkIn,
      checkOut,
    );
  }
  @Get('getAllAttendanceRecordInOneMonth')
  async getAllAttendanceRecordInOneMonth(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('value') value: string,
    @Query('date') date: Date,
  ) {
    return this.attendanceRecordService.getAllAttendanceRecordInOneMonth(
      page,
      size,
      sort,
      order,
      value,
      date,
    );
  }
}
