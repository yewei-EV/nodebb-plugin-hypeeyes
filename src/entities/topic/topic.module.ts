import { Module } from '@nestjs/common';
import { TopicController } from './topic.controller';
import { TopicService } from './topic.service';
import { PostModule } from '../post/post.module';
import {UserModule} from '../user/user.module';

@Module({
  controllers: [TopicController],
  providers: [TopicService],
  exports: [TopicService],
  imports: [PostModule, UserModule],
})
export class TopicModule {}
