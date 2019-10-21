import { Topic } from '../entities/topic/topic';
import { Post } from '../entities/post/post';

export function getTopics(ids: number[], uid: number): Promise<Topic[]>;
export function getMainPids(ids: number[]): Promise<number[]>;
export function getMainPosts(ids: number[], uid: number): Promise<Post[]>;
