import { Injectable } from '@nestjs/common';
import { CreatePerformanceReviewDto } from './dto/create-performance_review.dto';
import { UpdatePerformanceReviewDto } from './dto/update-performance_review.dto';

@Injectable()
export class PerformanceReviewsService {
  create(createPerformanceReviewDto: CreatePerformanceReviewDto) {
    return 'This action adds a new performanceReview';
  }

  findAll() {
    return `This action returns all performanceReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} performanceReview`;
  }

  update(id: number, updatePerformanceReviewDto: UpdatePerformanceReviewDto) {
    return `This action updates a #${id} performanceReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} performanceReview`;
  }
}
