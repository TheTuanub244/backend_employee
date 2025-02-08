import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ContractService } from './contract.service';
import { Types } from 'mongoose';

@Controller('contract')
export class ContractController {
  constructor(private contractService: ContractService) {}
  @Get('getAllContract')
  async getAllContract(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.contractService.getAllContract(page, size, sort, order);
  }
  @Get('getContractById/:id')
  async getContractById(@Param('id') id: string) {
    return this.contractService.getContractById(new Types.ObjectId(id));
  }
  @Get('searchContractByType')
  async searchContractByType(@Query('type') type: string) {
    return this.contractService.searchContractByType(type);
  }
  @Get('searchContractByStatus')
  async searchContractByStatus(@Query('status') status: string) {
    return this.contractService.searchContractByStatus(status);
  }
  @Post('createContract')
  async createContract(@Body() data: any) {
    return this.contractService.createContract(data);
  }
  @Delete('deleteContractById/:id')
  async deleteContractById(@Param('id') id: string) {
    return this.contractService.deleteContractById(new Types.ObjectId(id));
  }
}
