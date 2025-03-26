import { Injectable } from '@nestjs/common';
import { CreatePersonalPropertyDto } from './dto/create-personal_property.dto';
import { UpdatePersonalPropertyDto } from './dto/update-personal_property.dto';

@Injectable()
export class PersonalPropertyService {
  create(createPersonalPropertyDto: CreatePersonalPropertyDto) {
    return 'This action adds a new personalProperty';
  }

  findAll() {
    return `This action returns all personalProperty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalProperty`;
  }

  update(id: number, updatePersonalPropertyDto: UpdatePersonalPropertyDto) {
    return `This action updates a #${id} personalProperty`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalProperty`;
  }
}
