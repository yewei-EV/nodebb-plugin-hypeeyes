import { Injectable } from '@nestjs/common';
import * as topicLib from '@bbs/topics';
import { Topic } from './topic';
import { Post } from '../post/post';
import {Pageable} from '../../common/pageable';
import {Filter} from '@bbs/topics';

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

  public getTopicWithPosts(topic: Topic, set: any, uid: number, start: number, stop: number, reverse: boolean): Promise<Topic> {
    return this.topicLib.getTopicWithPosts(topic, set, uid, start, stop, reverse);
  }

  public getRecentTopic(cids: number[], uid: number, start: number, stop: number, filter: Filter) {
    return this.topicLib.getRecentTopics(cids, uid, start, stop, filter);
  }
}
