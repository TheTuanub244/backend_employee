import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DepartmentService } from './department.service';
import { Types } from 'mongoose';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}
  @Post('createDepartment')
  async createDepartment(@Body() data: any) {
    return this.departmentService.createDepartment(data);
  }
  @Get('getAllDepartment')
  async getAllDepartment(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.departmentService.getAllDepartment(page, size, sort, order);
  }
  @Get('getDepartmentById/:id')
  async getDepartmentById(@Param('id') id: string) {
    return this.departmentService.getDepartmentById(new Types.ObjectId(id));
  }
  @Get('searchDepartmentByName')
  async searchDepartmentByName(@Query('name') name: string) {
    return this.departmentService.searchDepartmentByName(name);
  }
  @Get('getDepartmentByManager/:id')
  async getDepartmentByManager(@Param('id') id: string) {
    return this.departmentService.getDepartmentByManager(
      new Types.ObjectId(id),
    );
  }
  @Delete('deleteDepartment/:id')
  async deleteDepartment(@Param('id') id: string) {
    return this.departmentService.deleteDepartment(new Types.ObjectId(id));
  }
  @Put('updateManager')
  async updateManager(@Body() data: any) {
    return this.departmentService.updateManager(
      data.oldManger,
      data.newManager,
    );
  }
}
