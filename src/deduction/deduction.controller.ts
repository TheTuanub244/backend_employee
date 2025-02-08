import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { CreateDeductionDto } from './dto/create-deduction.dto';
import { UpdateDeductionDto } from './dto/update-deduction.dto';

@Controller('deduction')
export class DeductionController {
  constructor(private readonly deductionService: DeductionService) {}

  @Post('createDeduction')
  createDeduction(@Body() createDeductionDto: any) {
    return this.deductionService.createDeduction(createDeductionDto);
  }

  @Get('getAllDeduction')
  getAllDeduction(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.deductionService.getAllDeduction(page, size, sort, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deductionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deductionService.remove(+id);
  }
}
