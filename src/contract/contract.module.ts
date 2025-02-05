import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Contract, ContractSchema } from './contract.schema';

@Module({
  controllers: [ContractController],
  providers: [ContractService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Contract.name,
        schema: ContractSchema,
      },
    ]),
  ],
})
export class ContractModule {}
