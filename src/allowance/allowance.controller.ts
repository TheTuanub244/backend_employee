import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AllowanceService } from './allowance.service';
import { CreateAllowanceDto } from './dto/create-allowance.dto';
import { UpdateAllowanceDto } from './dto/update-allowance.dto';
import { Types } from 'mongoose';

@Controller('allowance')
export class AllowanceController {
  constructor(private readonly allowanceService: AllowanceService) {}

  @Post()
  createAllowance(@Body() createAllowanceDto: CreateAllowanceDto) {
    return this.allowanceService.createAllowance(createAllowanceDto);
  }

  @Get()
  findAll() {
    return this.allowanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.allowanceService.findOne(new Types.ObjectId(id));
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAllowanceDto: UpdateAllowanceDto) {
  //   return this.allowanceService.update(+id, updateAllowanceDto);
  // }

  @Delete(':id')
  removeAllowance(@Param('id') id: string) {
    return this.allowanceService.removeAllowance(new Types.ObjectId(id));
  }
}
