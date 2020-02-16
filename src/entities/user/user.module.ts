import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrivilegeService } from '../privilege/privilege.service';
import {UserRepository} from './user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    PrivilegeService,
    UserRepository,
  ],
  exports: [UserService],
})
export class UserModule {}
