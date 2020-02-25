import { Controller, Param, Body, Post as POST } from '@nestjs/common';
import {CurPrincipal} from '../user/principal.decorator';
import {Principal} from '../user/principal';
import {PostService} from './post.service';

@Controller('posts')
export class PostController {

  constructor(private postService: PostService) {
  }

  @POST(':id/report')
  private async report(
    @Param('id') id: number,
    @Body('reason') reason: string,
    @CurPrincipal() principal: Principal) {
    id = +id;
    await this.postService.createFlags(principal.uid, 'post', id, reason);
  }
}
