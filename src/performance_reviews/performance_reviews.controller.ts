import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PerformanceReviewsService } from './performance_reviews.service';
import { CreatePerformanceReviewDto } from './dto/create-performance_review.dto';
import { UpdatePerformanceReviewDto } from './dto/update-performance_review.dto';

@Controller('performance-reviews')
export class PerformanceReviewsController {
  constructor(private readonly performanceReviewsService: PerformanceReviewsService) {}

  @Post()
  create(@Body() createPerformanceReviewDto: CreatePerformanceReviewDto) {
    return this.performanceReviewsService.create(createPerformanceReviewDto);
  }

  @Get()
  findAll() {
    return this.performanceReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performanceReviewsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerformanceReviewDto: UpdatePerformanceReviewDto) {
    return this.performanceReviewsService.update(+id, updatePerformanceReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performanceReviewsService.remove(+id);
  }
}
