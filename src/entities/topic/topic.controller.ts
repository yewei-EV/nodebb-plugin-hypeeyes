import { Controller, Get, Param, Query } from '@nestjs/common';
import { TopicService } from './topic.service';
import { Topic } from './topic';
import { Post, PostService } from '../post/post.module';

@Controller('topics')
export class TopicController {
  public constructor(private topicService: TopicService, private postService: PostService) {
  }

  @Get('byIds')
  private async getByIds(@Query('id') ids: number[]): Promise<Topic[]> {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    return await this.topicService.getByIds(ids, 0);
  }

  @Get(':id')
  private async getById(@Param('id') id: number): Promise<Topic> {
    return await this.topicService.getById(id, 0);
  }

  @Get(':id/main-post')
  private async getMainPost(@Param('id') id: number): Promise<Post> {
    const pids = await this.topicService.getMainPids([id]);
    const posts = await this.postService.getPostByIds([pids[0]], 0);
    if (posts.length > 0) {
      return posts[0];
    }
    return null;
  }
}
