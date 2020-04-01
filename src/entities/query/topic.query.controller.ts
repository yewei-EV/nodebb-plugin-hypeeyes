import {Controller, Get, Query} from '@nestjs/common';
import {CurPrincipal} from '../user/principal.decorator';
import {Principal} from '../user/principal';
import {Topic} from '../topic/topic';
import {TopicService} from '../topic/topic.service';
import {CategoryService} from '../category/category.service';
import {UserService} from '../user/user.service';
import {User} from '../user/user';
import {SortType} from '../../common/pageable';

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
  private async getByFollowingAndCid(@Query('cid') cidList: number[],
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

  @Get('myTopics')
  private async getMyTopics(@Query('cid') cidList: number[],
                            @Query('start') start: number,
                            @Query('stop') stop: number,
                            @CurPrincipal() principal: Principal): Promise<Topic[]> {
    if (!cidList || !principal.uid) {
      return [];
    }
    if (!Array.isArray(cidList)) {
      cidList = [cidList];
    }
    cidList = cidList.map(cid => +cid);
    start = +start;
    stop = +stop;
    return await this.categoryService.getTopicByCidUid(cidList, [principal.uid], start, stop, principal.uid);
  }

  @Get('byCidList')
  private async getByCidList(@Query('cid') cidList: number[],
                             @Query('start') start: number,
                             @Query('stop') stop: number,
                             @Query('sort') sort: SortType,
                             @CurPrincipal() principal: Principal): Promise<Topic[]> {
    if (!cidList) {
      return [];
    }
    if (!Array.isArray(cidList)) {
      cidList = [cidList];
    }
    cidList = cidList.map(cid => +cid);
    start = +start;
    stop = +stop;
    return await this.categoryService.getTopicByCidList(cidList, principal.uid, {start, stop, sort});
  }

  @Get('search')
  private async search(@Query('key') key: string,
                       @Query('page') page: number,
                       @Query('itemsPerPage') itemsPerPage: number,
                       @CurPrincipal() principal: Principal) {
    page = +page;
    itemsPerPage = +itemsPerPage;
    const result: any = await this.categoryService.search(key, page, itemsPerPage, principal.uid);
    const topics: Topic[] = result.posts.map(post => post.topic);
    return await this.topicService.getTopicsWithMainPosts(topics, principal.uid);
  }

}
