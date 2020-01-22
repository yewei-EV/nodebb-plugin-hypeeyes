import { Injectable } from '@nestjs/common';
import * as topicLib from '@bbs/topics';
import { Topic } from './topic';
import { Post } from '../post/post';
import {Pageable} from '../../common/pageable';

@Injectable()
export class TopicService {
  private topicLib = topicLib;

  public getById(id: number, uid: number): Promise<Topic> {
    const topicsPromise = this.topicLib.getTopics([id], uid);
    return topicsPromise.then((topics) => {
      if (topics.length > 0) {
        return topics[0];
      }
      return null;
    });
  }

  public async getByIds(ids: number[], uid: number): Promise<Topic[]> {
    return await this.topicLib.getTopics(ids, uid);
  }

  public getMainPids(ids: number[]): Promise<number[]> {
    return this.topicLib.getMainPids(ids);
  }

  public getMainPosts(mainPids: number[], uid: number): Promise<Post[]> {
    return this.topicLib.getMainPosts(mainPids, uid);
  }

  public getRecentTopic(info: Pageable, cid: number[], uid: number) {
    return this.topicLib.getSortedTopics({...info, cid, uid});
  }
}
