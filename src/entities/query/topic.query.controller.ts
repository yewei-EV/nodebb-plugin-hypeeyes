import {Controller, Get, Query} from '@nestjs/common';
import {CurPrincipal} from '../user/principal.decorator';
import {Principal} from '../user/principal';
import {Topic} from '../topic/topic';
import {TopicService} from '../topic/topic.service';
import {CategoryService} from '../category/category.service';
import {UserService} from '../user/user.service';
import {User} from '../user/user';

@Controller('queries/topics')
export class TopicQueryController {
  constructor(private topicService: TopicService, private categoryService: CategoryService, private userService: UserService) {
  }
  @Get('byIds')
  private async getByIds(@Query('id') ids: number[], @CurPrincipal() principal: Principal): Promise<Topic[]> {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    return await this.topicService.getByIds(ids, principal.uid);
  }

  @Get('byFollowingAndCid')
  private async getByCidUid(@Query('cid') cidList: number[],
                            @Query('start') start: number,
                            @Query('stop') stop: number,
                            @CurPrincipal() principal: Principal): Promise<Topic[]> {
    if (!cidList || !principal.uid) {
      return [];
    }
    if (!Array.isArray(cidList)) {
      cidList = [cidList];
    }
    const curUser: User = await this.userService.getUserById(principal.uid);
    const userList: User[] = await this.userService.getFollowing(principal.uid, 0, curUser.followingCount - 1);
    cidList = cidList.map(cid => +cid);
    const uidList = userList.map(user => +user.uid);
    start = +start;
    stop = +stop;
    return await this.categoryService.getTopicByCidUid(cidList, uidList, start, stop, principal.uid);
  }

}
