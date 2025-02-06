import { Module } from '@nestjs/common';
import { AllowanceService } from './allowance.service';
import { AllowanceController } from './allowance.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Allowance, AllowanceSchema } from './allowance.schema';

@Module({
  controllers: [AllowanceController],
  providers: [AllowanceService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Allowance.name,
        schema: AllowanceSchema,
      },
    ]),
  ],
})
export class AllowanceModule {}
