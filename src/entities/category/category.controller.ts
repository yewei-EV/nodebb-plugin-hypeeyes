import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category';
import { Pageable, SortType } from '../../common/pageable';
import { CurPrincipal } from '../user/principal.decorator';
import { Principal } from '../user/principal';
import { Topic } from '../topic/topic';
import { TopicService } from '../topic/topic.service';
import { PostService } from '../post/post.service';
import { Post } from '../post/post';

@Controller('categories')
export class CategoryController {

  constructor(private categoryService: CategoryService, private topicService: TopicService, private postService: PostService) {
  }

  @Get(':cid')
  async get(@Query('start') start: number,
            @Query('stop') stop: number,
            @Query('sort') sort: SortType,
            @Param('cid') cid: number,
            @CurPrincipal() principal: Principal,
  ): Promise<Topic[]> {
    const pageable = new Pageable();
    pageable.start = +start;
    pageable.stop = +stop;
    pageable.sort = sort;
    const uid = principal.uid;
    const result: {topics: Topic[], nextStart: number} = await this.categoryService.getCategoryTopics({cid, uid, ...pageable});
    return result.topics;
  }

  @Get(':cid/withMainPostInfo')
  async getTopicsWithMainPostInfo(@Query('start') start: number,
                                  @Query('stop') stop: number,
                                  @Query('sort') sort: SortType,
                                  @Param('cid') cid: number,
                                  @CurPrincipal() principal: Principal,
  ): Promise<Topic[]> {
    const topics: Topic[] = await this.getAllTopics(start, stop, sort, cid, principal);
    return await this.topicService.getTopicsWithMainPosts(topics, principal.uid);
  }

  @Get('')
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get(':cid/allTopics')
  async getAllTopics(@Query('start') start: number,
                     @Query('stop') stop: number,
                     @Query('sort') sort: SortType,
                     @Param('cid') cid: number,
                     @CurPrincipal() principal: Principal,
  ): Promise<Topic[]> {
    const pageable = new Pageable();
    pageable.start = +start;
    pageable.stop = +stop;
    pageable.sort = sort;
    const uid = principal.uid;
    return await this.categoryService.getTopicByCidList([cid], uid, pageable);
  }

}
