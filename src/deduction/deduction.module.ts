import { Module } from '@nestjs/common';
import { DeductionService } from './deduction.service';
import { DeductionController } from './deduction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deduction, DeductionSchema } from './deduction.schema';

@Module({
  controllers: [DeductionController],
  providers: [DeductionService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Deduction.name,
        schema: DeductionSchema,
      },
    ]),
  ],
})
export class DeductionModule {}
