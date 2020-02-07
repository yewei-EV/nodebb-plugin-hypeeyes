import { Module } from '@nestjs/common';
import {PostQueryController} from './post.query.controller';
import {TopicQueryController} from './topic.query.controller';
import {TopicModule} from '../topic/topic.module';
import {PostModule} from '../post/post.module';
import {CategoryModule} from '../category/category.module';

@Module({
  controllers: [TopicQueryController, PostQueryController],
  imports: [CategoryModule, TopicModule, PostModule],
})
export class QueryModule {}
