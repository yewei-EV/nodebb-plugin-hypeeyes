import {Controller, Get, Param, Query} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category';
import {Pageable} from "../../common/pageable";

@Controller('categories')
export class CategoryController {

  constructor(private categoryService: CategoryService) {
  }

  @Get('')
  async get(@Query('start') start: number,
            @Query('stop') stop: number,
            @Query('sort') sort: string,
            @Query('cid') cid: number,
            @Query('uid') uid: number,
  ) {
    const pageable = new Pageable();
    pageable.start = start;
    pageable.stop = stop;
    return await this.categoryService.getCategoryTopics({cid, uid, ...pageable});
  }

  @Get('/all')
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:cid/topics')
  async getTopicIds(@Param('cid') cid: number): Promise<number[]> {
    return await this.categoryService.getTopicIds(cid, 0, 4);
  }

}
