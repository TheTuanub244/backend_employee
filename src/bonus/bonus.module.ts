import { Module } from '@nestjs/common';
import { BonusService } from './bonus.service';
import { BonusController } from './bonus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bonus, BonusSchema } from './bonus.schema';

@Module({
  controllers: [BonusController],
  providers: [BonusService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Bonus.name,
        schema: BonusSchema,
      },
    ]),
  ],
})
export class BonusModule {}
