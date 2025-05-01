import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PropertyService } from './property.service';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}
  @Get('/getAllProperty')
  async getAllProperty() {
    return await this.propertyService.getAllProperty();
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
  @Get('/getAllPropertyByDepartment/:id')
  async getAllPropertyByDepartment(@Param('id') id: string) {
    return await this.propertyService.getAllPropertyByDepartment(id);
  }
  @Get('/getAllPropertyByDepartmentAndStatus/:departmentId/:status')
  async getAllPropertyByDepartmentAndStatus(
    @Param('departmentId') departmentId: string,
    @Param('status') status: string,
  ) {
    return await this.propertyService.getAllPropertyByDepartmentAndStatus(
      departmentId,
      status,
    );
  }
}
