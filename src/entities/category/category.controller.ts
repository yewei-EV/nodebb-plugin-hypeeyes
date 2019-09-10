import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category';
import { Pageable, SortType } from "../../common/pageable";
import { CurPrincipal } from '../user/principal.decorator';
import { Principal } from '../user/principal';
import { Topic } from '../topic/topic';
import { exhaustiveTypeException } from 'tsconfig-paths/lib/try-path';

@Controller('categories')
export class CategoryController {

  constructor(private categoryService: CategoryService) {
  }

  @Get('/:cid')
  async get(@Query('start') start: number,
            @Query('stop') stop: number,
            @Query('sort') sort: SortType,
            @Param('cid') cid: number,
            @CurPrincipal() principal: Principal,
  ) {
    const pageable = new Pageable();
    pageable.start = +start;
    pageable.stop = +stop;
    if (sort != SortType['most-posts']) {
      sort = SortType['most-votes'];
    }
    pageable.sort = sort;
    const uid = principal.uid;
    const result: {topics: Topic[], nextStart: number} = await this.categoryService.getCategoryTopics({cid, uid, ...pageable});
    return result.topics;
  }

  @Get('/')
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:cid/topics')
  async getTopicIds(@Param('cid') cid: number): Promise<number[]> {
    return await this.categoryService.getTopicIds(cid, 0, 4);
  }

}
