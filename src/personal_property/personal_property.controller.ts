import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalPropertyService } from './personal_property.service';
import { CreatePersonalPropertyDto } from './dto/create-personal_property.dto';
import { UpdatePersonalPropertyDto } from './dto/update-personal_property.dto';

@Controller('personal-property')
export class PersonalPropertyController {
  constructor(private readonly personalPropertyService: PersonalPropertyService) {}

  @Post()
  create(@Body() createPersonalPropertyDto: CreatePersonalPropertyDto) {
    return this.personalPropertyService.create(createPersonalPropertyDto);
  }

  @Get()
  findAll() {
    return this.personalPropertyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalPropertyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalPropertyDto: UpdatePersonalPropertyDto) {
    return this.personalPropertyService.update(+id, updatePersonalPropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalPropertyService.remove(+id);
  }
}
