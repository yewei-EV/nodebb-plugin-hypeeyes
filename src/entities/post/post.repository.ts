import {Post} from './post';
import * as db from '@bbs/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostRepository {

  async getPidListByUid(uid: number, start: number, stop: number): Promise<number[]> {
    const sets = ['uid:' + uid + ':posts'];
    return await db.getSortedSetUnion({sets, start, stop});
  }
}
