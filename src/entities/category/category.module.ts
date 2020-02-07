import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TopicModule } from '../topic/topic.module';
import { PostModule } from '../post/post.module';
import {CategoryRepository} from './category.repository';

@Module({
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
  imports: [TopicModule, PostModule],
  exports: [CategoryService],
})
export class CategoryModule {}
