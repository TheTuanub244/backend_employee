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
import { TaxRecordService } from './tax_record.service';
import { CreateTaxRecordDto } from './dto/create-tax_record.dto';
import { UpdateTaxRecordDto } from './dto/update-tax_record.dto';

@Controller('tax-record')
export class TaxRecordController {
  constructor(private readonly taxRecordService: TaxRecordService) {}

  @Post()
  create(@Body() createTaxRecordDto: CreateTaxRecordDto) {
    return this.taxRecordService.create(createTaxRecordDto);
  }

  @Get('getAllTaxRecord')
  getAllTaxRecord(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.taxRecordService.getAllTaxRecord(page, size, sort, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taxRecordService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaxRecordDto: UpdateTaxRecordDto,
  ) {
    return this.taxRecordService.update(+id, updateTaxRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taxRecordService.remove(+id);
  }
}
