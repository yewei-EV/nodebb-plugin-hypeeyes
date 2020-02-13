import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrivilegeService } from '../privilege/privilege.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrivilegeService,
  ],
  exports: [UserService],
})
export class UserModule {}
