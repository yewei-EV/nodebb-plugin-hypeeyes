import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category';

@Controller('categories')
export class CategoryController {

  constructor(private categoryService: CategoryService) {
  }

  @Get()
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:cid/topics')
  async getTopicIds(@Param('cid') cid: number): Promise<number[]> {
    return await this.categoryService.getTopicIds(cid, 0, 4);
  }
}
