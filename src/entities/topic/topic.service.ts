import { Injectable } from '@nestjs/common';
import * as topicLib from '@bbs/topics';
import { Topic } from './topic';
import { Post } from '../post/post';

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

  public async getMainPids(ids: number[]): Promise<number[]> {
    return await this.topicLib.getMainPids(ids);
  }

  public async getMainPosts(mainPids: number[], uid: number): Promise<Post[]> {
    return await this.topicLib.getMainPosts(mainPids, uid);
  }

  public async getTopicWithPosts(topic: Topic, set: any, uid: number, start: number, stop: number, reverse: boolean): Promise<Topic> {
    return await this.topicLib.getTopicWithPosts(topic, set, uid, start, stop, reverse);
  }

  public async getTopicsWithMainPosts(topics: Topic[], uid: number): Promise<Topic[]> {
    const topicIds: number[] = topics.map(topic => topic.tid);
    const mainPosts: Post[] = await this.getMainPosts(topicIds, uid);
    for (const post of mainPosts) {
      for (const topic of topics) {
        if (topic.tid === post.tid) {
          const newPost: Post = Object.assign(new Post(), post);
          topic.firstImg = newPost.firstImg;
          topic.firstCalendar = newPost.fistCalendar;
          topic.mainPost = newPost;
        }
      }
    }
    return topics;
  }
}
