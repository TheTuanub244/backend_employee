import { PartialType } from '@nestjs/mapped-types';
import { CreatePerformanceReviewDto } from './create-performance_review.dto';

export class UpdatePerformanceReviewDto extends PartialType(CreatePerformanceReviewDto) {}
