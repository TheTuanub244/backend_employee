import { Injectable } from '@nestjs/common';
import { CreateTaxRecordDto } from './dto/create-tax_record.dto';
import { UpdateTaxRecordDto } from './dto/update-tax_record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TaxRecord } from './tax_record.schema';
import { Model } from 'mongoose';

@Injectable()
export class TaxRecordService {
  constructor(
    @InjectModel(TaxRecord.name)
    private taxRecordSchema: Model<TaxRecord>
  ){}
  create(createTaxRecordDto: CreateTaxRecordDto) {
    return 'This action adds a new taxRecord';
  }

  async getAllTaxRecord(
    page: number,
    perPage: number,
    field: string,
    order: string,
  ) {
    const skip = (page - 1) * perPage;
    const sortOrder = order === 'ASC' ? 1 : -1;
    return await this.taxRecordSchema
      .find()
      .skip(skip)
      .limit(perPage)
      .sort({
        [field]: sortOrder,
      });
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
