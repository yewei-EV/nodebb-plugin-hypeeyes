export class Topic {
  static convert(topic: any): Topic {
    topic.postCount = topic.postcount;
    delete topic.postcount;
    topic = Object.assign(topic, Topic);
    return topic;
  }
  firstImg: string;
  firstCalendar: Date;
  tid: number;
  title: string;
  slug: string;
  titleRaw: string;
}
