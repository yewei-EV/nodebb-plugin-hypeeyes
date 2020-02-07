import {Controller, Get, Query} from '@nestjs/common';
import {CurPrincipal} from '../user/principal.decorator';
import {Principal} from '../user/principal';
import {Topic} from '../topic/topic';
import {TopicService} from '../topic/topic.service';
import {CategoryService} from '../category/category.service';

@Controller('queries/topics')
export class TopicQueryController {
  constructor(private topicService: TopicService, private categoryService: CategoryService) {
  }
  @Get('byIds')
  private async getByIds(@Query('id') ids: number[], @CurPrincipal() principal: Principal): Promise<Topic[]> {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }
    return await this.topicService.getByIds(ids, principal.uid);
  }

  @Get('byCidUid')
  private async getByCidUid(@Query('cid') cidList: number[],
                            @Query('uid') uidList: number[],
                            @Query('start') start: number,
                            @Query('stop') stop: number,
                            @CurPrincipal() principal: Principal): Promise<Topic[]> {
    if (!Array.isArray(cidList)) {
      cidList = [cidList];
    }
    if (!Array.isArray(uidList)) {
      uidList = [uidList];
    }
    cidList = cidList.map(cid => +cid);
    uidList = uidList.map(uid => +uid);
    start = +start;
    stop = +stop;
    return await this.categoryService.getTopicByCidUid(cidList, uidList, start, stop, principal.uid);
  }

}
