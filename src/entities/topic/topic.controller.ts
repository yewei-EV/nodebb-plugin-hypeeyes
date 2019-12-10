import { Controller, Get, Param, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Topic } from './topic';
import { Post, PostService } from '../post/post.module';
import { CurPrincipal } from '../user/principal.decorator';
import { Principal } from '../user/principal';

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

  @Get(':id/main-post')
  private async getMainPost(@Param('id') id: number, @CurPrincipal() principal: Principal): Promise<Post> {
    const pids = await this.topicService.getMainPids([id]);
    const posts = await this.postService.getPostByIds([pids[0]], principal.uid);
    if (posts.length > 0) {
      return posts[0];
    }
    return null;
  }
}
