import {Post} from '../post/post';
import {User} from '../user/user';
import validator from 'validator';

export class Topic {
  static convert(topic: any): Topic {
    topic.postCount = topic.postcount;
    if (topic.thumb) {
      topic.thumb = validator.unescape(topic.thumb);
    }
    delete topic.postcount;
    topic = Object.assign(new Topic(), topic);
    if (topic.mainPost) {
      topic.mainPost = Post.convert(topic.mainPost);
    }
    return topic;
  }
  firstImg: string;
  firstCalendar: Date;
  tid: number;
  title: string;
  thumb: string;
  mainPost: Post;
  posts: Post[];
  slug: string;
  titleRaw: string;

  user: User;
  // add this property for app
  isFollowingPoster: boolean;
}
