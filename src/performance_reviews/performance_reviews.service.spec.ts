import { Test, TestingModule } from '@nestjs/testing';
import { PerformanceReviewsService } from './performance_reviews.service';

describe('PerformanceReviewsService', () => {
  let service: PerformanceReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerformanceReviewsService],
    }).compile();

    service = module.get<PerformanceReviewsService>(PerformanceReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
