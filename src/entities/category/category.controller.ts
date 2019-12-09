import { Controller, Get, Param, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category';
import { Pageable, SortType } from "../../common/pageable";
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

  @Get('/:cid')
  async get(@Query('start') start: number,
            @Query('stop') stop: number,
            @Query('sort') sort: SortType,
            @Param('cid') cid: number,
            @CurPrincipal() principal: Principal,
  ): Promise<Topic[]> {
    const pageable = new Pageable();
    pageable.start = +start;
    pageable.stop = +stop;
    if (sort != SortType['most_posts']) {
      sort = SortType['most_votes'];
    }
    pageable.sort = sort;
    const uid = principal.uid;
    const result: {topics: Topic[], nextStart: number} = await this.categoryService.getCategoryTopics({cid, uid, ...pageable});
    return result.topics;
  }

  @Get('/:cid/withMainPostInfo')
  async getTopicsWithMainPostInfo(@Query('start') start: number,
            @Query('stop') stop: number,
            @Query('sort') sort: SortType,
            @Param('cid') cid: number,
            @CurPrincipal() principal: Principal,
  ): Promise<Topic[]> {
    const topics: Topic[] = await this.get(start, stop, sort, cid, principal);
    const topicIds: number[] = topics.map(topic => topic.tid);
    const mainPosts: Post[] = await this.topicService.getMainPosts(topicIds, 0);
    for (const post of mainPosts) {
      for (const topic of topics) {
        if (topic.tid === post.tid) {
          const newPost: Post = Object.assign(new Post(), post);
          topic.firstImg = newPost.firstImg;
          topic.firstCalendar = newPost.fistCalendar;
        }
      }
    }
    return topics;
  }

  @Get('/')
  async getAll(): Promise<Category[]> {
    return await this.categoryService.getAllCategories();
  }

  @Get('/:cid/allTopics')
  async getAllTopics(@Query('start') start: number,
            @Query('stop') stop: number,
            @Query('sort') sort: SortType,
            @Param('cid') cid: number,
            @CurPrincipal() principal: Principal,
  ): Promise<Topic[]> {
    const pageable = new Pageable();
    pageable.start = +start;
    pageable.stop = +stop;
    if (sort != SortType['most_posts']) {
      sort = SortType['most_votes'];
    }
    pageable.sort = sort;
    const uid = principal.uid;
    const result: {topics: Topic[], nextStart: number} =
            await this.categoryService.getCategoryTopicsInThisCategory({cid, uid, ...pageable});
    return result.topics;
  }

}
