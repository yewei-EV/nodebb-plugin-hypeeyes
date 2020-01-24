import { Topic } from '../entities/topic/topic';
import { Post } from '../entities/post/post';
import { Pageable } from '../common/pageable';

export function getTopics(ids: number[], uid: number): Promise<Topic[]>;
export function getTopicWithPosts(topic: Topic, set: any, uid: number, start: number, stop: number, reverse: boolean): Promise<Topic>;
export function getMainPids(ids: number[]): Promise<number[]>;
export function getMainPosts(ids: number[], uid: number): Promise<Post[]>;
