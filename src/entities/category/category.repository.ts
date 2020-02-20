import * as db from '@bbs/database';
import {Injectable} from '@nestjs/common';
import {Pageable} from '../../common/pageable';
import * as lodash from 'lodash';

@Injectable()
export class CategoryRepository {
  private db = db;

  async getTopicIdListByCidUid(cidList: number[], uidList: number[], start: number, stop: number): Promise<number[]> {
    const sets: string[] = [];
    for (const cid of cidList) {
      for (const uid of uidList) {
        sets.push('cid:' + cid + ':uid:' + uid + ':tids');
      }
    }
    return await this.db.getSortedSetUnion({sets, start, stop});
  }

  private async getPinnedTidList(cidList: number[], pageable: Pageable) {
    let tidList = [];
    for (const cid of cidList) {
      const set = await this.db.getSortedSetRevRange('cid:' + cid + ':tids:pinned', pageable.start, pageable.stop);
      pageable.start = pageable.start + set.length;
      tidList = tidList.concat(set);
    }
    return tidList;
  }

  private static async buildSortedSet(cidList: number[], pageable: Pageable) {
    let set = [];
    for (const cid of cidList) {
      let key = 'cid:' + cid + ':tids';
      const sort = pageable.sort || 'newest_to_oldest';
      if (sort === 'most_posts') {
        key = 'cid:' + cid + ':tids:posts';
      } else if (sort === 'most_votes') {
        key = 'cid:' + cid + ':tids:votes';
      }
      set = set.concat(key);
    }
    return set;
  }

  private static async getDirection(pageable: Pageable) {
    const sort = pageable.sort || 'newest_to_oldest';
    return sort === 'newest_to_oldest' || sort === 'most_posts' || sort === 'most_votes' ? 'highest-to-lowest' : 'lowest-to-highest';
  }

  async getTopicIdListByCidList(cidList: number[], pageable: Pageable) {
    const copyPageable = lodash.cloneDeep(pageable);
    const pinnedTidList = await this.getPinnedTidList(cidList, copyPageable);
    const set = await CategoryRepository.buildSortedSet(cidList, pageable);
    const direction = await CategoryRepository.getDirection(pageable);

    const totalPinnedCount = pinnedTidList.length;
    const pinnedTidListOnPage = pinnedTidList.slice(pageable.start, pageable.stop > -1 ? pageable.stop + 1 : undefined);
    const pinnedCountOnPage = pinnedTidListOnPage.length;
    const topicsPerPage = pageable.stop - pageable.start + 1;
    const normalTidListToGet = Math.max(0, topicsPerPage - pinnedCountOnPage);

    if (!normalTidListToGet && pageable.stop !== -1) {
      return pinnedTidListOnPage;
    }

    if (pageable.start > 0 && totalPinnedCount) {
      pageable.start -= totalPinnedCount - pinnedCountOnPage;
    }

    pageable.stop = pageable.stop === -1 ? pageable.stop : pageable.start + normalTidListToGet - 1;
    let normalTidList;
    const reverse = direction === 'highest-to-lowest';
    if (Array.isArray(set)) {
      normalTidList = await db[reverse ? 'getSortedSetRevUnion' : 'getSortedSetUnion']({
        sets: set,
        start: pageable.start,
        stop: pageable.stop,
      });
    } else {
      normalTidList = await db[reverse ? 'getSortedSetRevRange' : 'getSortedSetRange'](set, pageable.start, pageable.stop);
    }
    normalTidList = normalTidList.filter(tid => !pinnedTidList.includes(tid));
    return pinnedTidListOnPage.concat(normalTidList);
  }

  async getTopicCount(cidList: number[], pageable: Pageable) {
    const set = await CategoryRepository.buildSortedSet(cidList, pageable);
    return await this.db.sortedSetUnionCard(set);
  }

}
