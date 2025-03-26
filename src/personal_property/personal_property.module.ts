import { Module } from '@nestjs/common';
import { PersonalPropertyService } from './personal_property.service';
import { PersonalPropertyController } from './personal_property.controller';

@Module({
  controllers: [PersonalPropertyController],
  providers: [PersonalPropertyService],
})
export class PersonalPropertyModule {}
