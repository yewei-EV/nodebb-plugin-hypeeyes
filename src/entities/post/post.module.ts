import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';

export * from './post';
export * from './post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
