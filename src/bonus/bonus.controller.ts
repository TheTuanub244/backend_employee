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
import { BonusService } from './bonus.service';
import { CreateBonusDto } from './dto/create-bonus.dto';
import { UpdateBonusDto } from './dto/update-bonus.dto';

@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Post('createBonus')
  createBonus(@Body() createBonusDto: any) {
    return this.bonusService.createBonus(createBonusDto);
  }

  @Get('getAllBonus')
  getAllBonus(
    @Query('page') page: number,
    @Query('size') size: number,
    @Query('sort') sort: string,
    @Query('order') order: string,
  ) {
    return this.bonusService.getAllBonus(page, size, sort, order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bonusService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBonusDto: UpdateBonusDto) {
    return this.bonusService.update(+id, updateBonusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bonusService.remove(+id);
  }
}
