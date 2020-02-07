import { Category } from '../entities/category/category';
import { Topic } from '../entities/topic/topic';
import { Pageable } from '../common/pageable';

export function getCategoryTopics(options: {uid: number, cid: number} & Pageable):
    Promise<{topics: Topic[], nextStart: number}>;

export function getCategoryById(options: {}): Promise<Category>;

export function getAllCategories(uid: number): Promise<Category[]>;

export function getTopicIds(options: {}): Promise<number[]>;
export function getCategoryTopicsInThisCategory(options: {uid: number, cid: number} & Pageable):
        Promise<{topics: Topic[], nextStart: number}>;
export function getChildrenCids(rootCid: number): Promise<number[]>;
