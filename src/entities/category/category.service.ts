import { Injectable } from '@nestjs/common';
import * as categoryLib from '@bbs/categories';
import { Category } from './category';

@Injectable()
export class CategoryService {
  private categoryLib = categoryLib;

  public getCategoryById(cid: number, offset: number, pageSize: number): Promise<Category> {
    return this.categoryLib.getCategoryById({ cid, start: offset, stop: offset + pageSize - 1 });
  }

  public getAllCategories(): Promise<Category[]> {
    return this.categoryLib.getAllCategories(0);
  }

  public getTopicIds(cid: number, offset: number, pageSize: number): Promise<number[]> {
    return this.categoryLib.getTopicIds({ cid, start: offset, stop: pageSize + offset - 1 });
  }
}
