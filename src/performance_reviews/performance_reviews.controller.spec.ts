import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceReviewsController } from './performance_reviews.controller';
import { PerformanceReviewsService } from './performance_reviews.service';

describe('PerformanceReviewsController', () => {
  let controller: PerformanceReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerformanceReviewsController],
      providers: [PerformanceReviewsService],
    }).compile();

    controller = module.get<PerformanceReviewsController>(PerformanceReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
