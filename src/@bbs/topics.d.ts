import { Topic } from '../entities/topic/topic';

export function getTopics(ids: number[], uid: number): Promise<Topic[]>;
export function getMainPids(ids: number[]): Promise<number[]>;
