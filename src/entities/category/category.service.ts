import { Injectable } from '@nestjs/common';
import * as categoryLib from '@bbs/categories';
import { Category } from './category';
import {Pageable} from '../../common/pageable';
import {Topic} from '../topic/topic';
import {CategoryRepository} from './category.repository';
import * as topicLib from '@bbs/topics';
import {TopicService} from '../topic/topic.service';

@Injectable()
export class CategoryService {

  constructor(private categoryRepository: CategoryRepository, private topicService: TopicService) {
  }

  private categoryLib = categoryLib;
  private topicLib = topicLib;

  public getCategoryById(cid: number, offset: number, pageSize: number): Promise<Category> {
    return this.categoryLib.getCategoryById({ cid, start: offset, stop: offset + pageSize - 1 });
  }

  public getAllCategories(): Promise<Category[]> {
    return this.categoryLib.getAllCategories(0);
  }

  public getTopicIds(cid: number, offset: number, pageSize: number): Promise<number[]> {
    return this.categoryLib.getTopicIds({ cid, start: offset, stop: pageSize + offset - 1 });
  }

  public getCategoryTopics(options: {cid: number, uid: number} & Pageable) {
    return this.categoryLib.getCategoryTopics(options);
  }

  public getCategoryTopicsInThisCategory(options: {cid: number, uid: number} & Pageable) {
    return this.categoryLib.getCategoryTopicsInThisCategory(options);
  }

  public async getChildrenCidList(cid: number): Promise<number[]> {
    return await this.categoryLib.getChildrenCids(cid);
  }

  public async getTopicByCidUid(cidList: number[], uidList, start: number, stop: number, uid: number) {
    const childrenIdList = [];
    for (const cid of cidList) {
      childrenIdList.push(cid);
      const list = await this.getChildrenCidList(cid);
      list.map(id => childrenIdList.push(id));
    }
    const tidList: number[] = await this.categoryRepository.getTopicIdListByCidUid(childrenIdList, uidList, start, stop);
    const topics: Topic[] = await this.topicLib.getTopics(tidList, uid);
    return await this.topicService.getTopicsWithMainPosts(topics, uid);
  }
}
