import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalPropertyDto } from './create-personal_property.dto';

export class UpdatePersonalPropertyDto extends PartialType(CreatePersonalPropertyDto) {}
