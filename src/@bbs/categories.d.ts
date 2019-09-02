import { Category } from '../entities/category/category';

export function getCategoryById(options: {}): Promise<Category>;

export function getAllCategories(uid: number): Promise<Category[]>;

export function getTopicIds(options: {}): Promise<number[]>;
