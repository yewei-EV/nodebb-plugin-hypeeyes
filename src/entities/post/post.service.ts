import { Injectable } from '@nestjs/common';
import * as postLib from '@bbs/posts';
import { Post } from './post';
import {PostRepository} from './post.repository';

@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {
  }

  private postLib = postLib;

  public async getPostByIds(ids: number[], uid: number): Promise<Post[]> {
    return await this.postLib.getPostsByPids(ids, uid);
  }

  public async getPostByUid(uid: number, start: number, stop: number, loginUid): Promise<Post[]> {
    const pidList = await this.postRepository.getPidListByUid(uid, start, stop);
    return await this.postLib.getPostsByPids(pidList, loginUid);
  }
}
