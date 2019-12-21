import {Post} from '../post/post';

export class Topic {
  static convert(topic: any): Topic {
    topic.postCount = topic.postcount;
    delete topic.postcount;
    topic = Object.assign(topic, Topic);
    if (topic.mainPost) {
      topic.mainPost = Post.convert(topic.mainPost);
    }
    return topic;
  }
  firstImg: string;
  firstCalendar: Date;
  tid: number;
  title: string;
  mainPost: Post;
  slug: string;
  titleRaw: string;
}
