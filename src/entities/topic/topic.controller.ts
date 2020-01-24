import { Controller, Get, Param, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Topic } from './topic';
import { Post, PostService } from '../post/post.module';
import { CurPrincipal } from '../user/principal.decorator';
import { Principal } from '../user/principal';
import { SortType } from '../../common/pageable';

@Controller('topics')
export class TopicController {
  public constructor(private topicService: TopicService, private postService: PostService) {
  }

  @Get('byIds')
  private async getByIds(@Query('id') ids: number[], @CurPrincipal() principal: Principal): Promise<Topic[]> {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    return await this.topicService.getByIds(ids, principal.uid);
  }

  @Get(':id')
  private async getById(@Param('id') id: number, @CurPrincipal() principal: Principal): Promise<Topic> {
    return await this.topicService.getById(id, principal.uid);
  }

  @Get(':id/mainPost')
  private async getMainPost(@Param('id') id: number, @CurPrincipal() principal: Principal): Promise<Post> {
    const pids = await this.topicService.getMainPids([id]);
    const posts = await this.postService.getPostByIds([pids[0]], principal.uid);
    if (posts.length > 0) {
      return posts[0];
    }
    return null;
  }

  @Get(':id/withPosts')
  private async getWithPosts(@Query('start') start: number,
                             @Query('stop') stop: number,
                             @Query('sort') sort: SortType,
                             @Param('id') tid: number,
                             @CurPrincipal() principal: Principal
  ): Promise<Topic> {
    start = +start;
    stop = +stop;
    tid = +tid;
    const set = sort === 'most_votes' ? 'tid:' + tid + ':posts:votes' : 'tid:' + tid + ':posts';
    const reverse = sort === 'newest_to_oldest' || sort === 'most_votes';
    const topic = await this.topicService.getById(tid, principal.uid);
    return await this.topicService.getTopicWithPosts(topic, set, principal.uid, start, stop, reverse);
  }
}
