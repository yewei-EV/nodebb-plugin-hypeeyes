import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { TopicModule } from './topic/topic.module';
import { PostModule } from './post/post.module';
import { NavigationModule } from './navigation/navigation.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import {QueryModule} from './query/query.module';

@Module({
  imports: [
    CategoryModule,
    TopicModule,
    PostModule,
    NavigationModule,
    UserModule,
    ConfigModule,
    QueryModule,
  ],
})
export class EntityModule {}
