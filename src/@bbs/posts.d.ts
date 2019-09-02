import { Post } from '../entities/post/post';

export function getPostsByPids(ids: number[], uid: number): Promise<Post[]>;
