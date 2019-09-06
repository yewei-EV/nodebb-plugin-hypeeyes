import { Injectable } from '@nestjs/common';
import * as postLib from '@bbs/posts';
import { Post } from './post';

@Injectable()
export class PostService {
  private postLib = postLib;

  public getPostByIds(ids: number[], uid: number): Promise<Post[]> {
    return this.postLib.getPostsByPids(ids, uid);
  }
}
