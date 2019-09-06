import { Injectable } from '@nestjs/common';
import * as topicLib from '@bbs/topics';
import { Topic } from './topic';

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

  public getMainPids(ids: number[]): Promise<number[]> {
    return this.topicLib.getMainPids(ids);
  }

  public test() {
    return 'test';
  }
}
