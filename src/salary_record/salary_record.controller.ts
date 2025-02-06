import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SalaryRecordService } from './salary_record.service';
import { CreateSalaryRecordDto } from './dto/create-salary_record.dto';
import { UpdateSalaryRecordDto } from './dto/update-salary_record.dto';
import { Types } from 'mongoose';

@Controller('salary-record')
export class SalaryRecordController {
  constructor(private readonly salaryRecordService: SalaryRecordService) {}
  @Post('/calculateNetSalary/:id')
  async calculateNetSalary(@Param('id') id: string, @Body() data: any) {
    return this.salaryRecordService.calculateSalary(
      new Types.ObjectId(id),
      data.month,
    );
  }
  @Post()
  create(@Body() createSalaryRecordDto: CreateSalaryRecordDto) {
    return this.salaryRecordService.create(createSalaryRecordDto);
  }

  @Get()
  findAll() {
    return this.salaryRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salaryRecordService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSalaryRecordDto: UpdateSalaryRecordDto,
  ) {
    return this.salaryRecordService.update(+id, updateSalaryRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salaryRecordService.remove(+id);
  }
}
