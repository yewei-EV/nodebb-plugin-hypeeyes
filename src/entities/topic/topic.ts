export class Topic {
  static convert(topic: any): Topic {
    topic.postCount = topic.postcount;
    delete topic.postcount;
    topic = Object.assign(topic, Topic);
    return topic;
  }
}
