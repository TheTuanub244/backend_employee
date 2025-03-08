import { Module } from '@nestjs/common';
import { PerformanceReviewsService } from './performance_reviews.service';
import { PerformanceReviewsController } from './performance_reviews.controller';

@Module({
  controllers: [PerformanceReviewsController],
  providers: [PerformanceReviewsService],
})
export class PerformanceReviewsModule {}
