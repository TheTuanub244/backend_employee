import { Injectable } from '@nestjs/common';
import { CreateTaxRecordDto } from './dto/create-tax_record.dto';
import { UpdateTaxRecordDto } from './dto/update-tax_record.dto';

@Injectable()
export class TaxRecordService {
  create(createTaxRecordDto: CreateTaxRecordDto) {
    return 'This action adds a new taxRecord';
  }

  findAll() {
    return `This action returns all taxRecord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taxRecord`;
  }

  update(id: number, updateTaxRecordDto: UpdateTaxRecordDto) {
    return `This action updates a #${id} taxRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} taxRecord`;
  }
}
