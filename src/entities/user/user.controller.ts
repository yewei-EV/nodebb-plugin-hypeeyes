import { Controller, Get, Query, Param } from '@nestjs/common';
import { CurPrincipal } from './principal.decorator';
import { Principal } from './principal';
import { User } from './user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get('cur-user')
  async getCurUser(@CurPrincipal() curPrincipal: Principal): Promise<User> {
    if (curPrincipal) {
      const uid = curPrincipal.uid;
      return await this.userService.getUserById(uid);
    }
    return null;
  }

  @Get('following')
  async getFollowing(@Query('start') start: number,
                     @Query('stop') stop: number,
                     @CurPrincipal() curPrincipal: Principal): Promise<User[]> {
    start = +start;
    stop = +stop;
    return this.userService.getFollowing(curPrincipal.uid, start, stop);
  }

  @Get(':uid')
  async getByUid(@Param('uid') uid: number): Promise<User> {
    uid = +uid;
    return await this.userService.getUserById(uid);
  }

  @Get(':uid/reputation')
  async increaseReputation(@Param('uid') uid: number, @Query('reputation') reputation: number) {
    reputation = +reputation;
    if (reputation === 0) {
      return await this.userService.getReputation(uid);
    }
    return await this.userService.increaseReputation(uid, reputation);
  }
}
