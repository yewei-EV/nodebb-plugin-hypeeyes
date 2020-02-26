import { Injectable } from '@nestjs/common';
import * as postLib from '@bbs/posts';
import { Post } from './post';
import {PostRepository} from './post.repository';
import * as flagLib from '@bbs/flags';
import {FlagInfo} from '@bbs/flags';

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

  public async createFlags(uid: number, type: 'user'|'post', id: number, reason: string) {
    if (!uid) {
      throw new Error('[[error:not-logged-in]]');
    }

    if (!type || !id || !reason) {
      throw new Error('[[error:invalid-data]]');
    }
    const flagInfo: FlagInfo = {uid, type, id, reason};
    await flagLib.validate(flagInfo);

    const flagObj = await flagLib.create(type, id, uid, reason, null);
    await flagLib.notify(flagObj, uid);
    return flagObj;
  }
}
