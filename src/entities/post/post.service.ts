import { Injectable } from '@nestjs/common';
import * as postLib from '@bbs/posts';
import { Post } from './post';

@Injectable()
export class PostService {
  private postLib = postLib;

  public async getPostByIds(ids: number[], uid: number): Promise<Post[]> {
    return await this.postLib.getPostsByPids(ids, uid);
  }
}
