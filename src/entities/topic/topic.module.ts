import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { PostModule } from '../post/post.module';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
  imports: [PostModule],
})
export class TopicModule {}
