import { Module } from '@nestjs/common';
import {PostQueryController} from './post.query.controller';
import {TopicQueryController} from './topic.query.controller';
import {TopicModule} from '../topic/topic.module';
import {PostModule} from '../post/post.module';
import {CategoryModule} from '../category/category.module';
import {UserModule} from '../user/user.module';

@Module({
  controllers: [TopicQueryController, PostQueryController],
  imports: [CategoryModule, TopicModule, PostModule, UserModule],
})
export class QueryModule {}
