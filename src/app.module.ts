import { Module } from '@nestjs/common';
import { CategoryModule } from './entities/category/category.module';
import { ConfigModule } from './entities/config/config.module';
import { NavigationModule } from './entities/navigation/navigation.module';
import { PostModule } from './entities/post/post.module';
import { UserModule } from './entities/user/user.module';
import { UserService } from './entities/user/user.service';
import { PrivilegeService } from './entities/privilege/privilege.service';

@Module({
  imports: [
    CategoryModule,
    ConfigModule,
    NavigationModule,
    PostModule,
    UserModule,
  ],
  providers: [
    UserService,
    PrivilegeService,
  ],
})
export class AppModule {}
