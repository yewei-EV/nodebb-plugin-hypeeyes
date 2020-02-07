import { Controller, Get, Param, Query } from '@nestjs/common';
import {PostService} from '../post/post.service';
import {Post} from '../post/post';
import {CurPrincipal} from '../user/principal.decorator';
import {Principal} from '../user/principal';

@Controller('queries/posts')
export class PostQueryController {

  constructor(private postService: PostService) {
  }

  @Get('byUid/:uid')
  async getByUid(@Param('uid') uid: number,
                 @Query('start') start: number,
                 @Query('stop') stop: number,
                 @CurPrincipal() principal: Principal): Promise<Post[]> {
    uid = +uid;
    start = +start;
    stop = +stop;
    return await this.postService.getPostByUid(uid, start, stop, principal.uid);
  }
}
