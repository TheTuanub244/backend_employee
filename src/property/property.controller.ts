import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @Get('/getAllProperty')
  async getAllProperty(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('value') value: string,
  ) {
    return await this.propertyService.getAllProperty(
      page,
      size,
      sort,
      order,
      value,
    );
  }
  @Post('/createProperty')
  async createProperty(@Body() body: any) {
    return await this.propertyService.createProperty(body);
  }

  @Get('/requestMaintenance/:id')
  async requestMaintenance(@Param('id') id: string) {
    return await this.propertyService.requestMaintenance(id);
  }
  @Get('/returnProperty/:id')
  async returnProperty(@Param('id') id: string) {
    return await this.propertyService.returnProperty(id);
  }
  @Get('acceptMaintaince/:id')
  async acceptMaintaince(@Param('id')id : string){
    return await this.propertyService.acceptMaintaince(id)
  }
  @Get('/getAllPropertyByDepartmentAndStatus')
  async getAllPropertyByDepartmentAndStatus(
    @Query('departmentId') departmentId: string,
    @Query('status') status: string,
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
    @Query('value') value: string,
  ) {
    return await this.propertyService.getAllPropertyByDepartmentAndStatus(
      page,
      size,
      sort,
      order,
      departmentId,
      status,
      value,
    );
  }
}
