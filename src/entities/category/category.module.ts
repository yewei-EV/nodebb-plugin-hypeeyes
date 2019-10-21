import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TopicModule } from '../topic/topic.module';
import { PostModule } from '../post/post.module';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [TopicModule, PostModule],
})
export class CategoryModule {}
