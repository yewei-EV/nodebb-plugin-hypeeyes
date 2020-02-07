import * as db from '@bbs/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  async getTopicIdListByCidUid(cidList: number[], uidList: number[], start: number, stop: number): Promise<number[]> {
    const sets: string[] = [];
    for (const cid of cidList) {
      for (const uid of uidList) {
        sets.push('cid:' + cid + ':uid:' + uid + ':tids');
      }
    }
    return await db.getSortedSetUnion({sets, start, stop});
  }
}
