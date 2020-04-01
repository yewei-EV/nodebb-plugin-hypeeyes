import { Injectable } from '@nestjs/common';
import * as categoryLib from '@bbs/categories';
import { Category } from './category';
import {Pageable} from '../../common/pageable';
import {Topic} from '../topic/topic';
import {CategoryRepository} from './category.repository';
import * as topicLib from '@bbs/topics';
import * as searchLib from '@bbs/search';
import {TopicService} from '../topic/topic.service';
import {SearchParam} from '@bbs/search';

@Injectable()
export class CategoryService {

  constructor(private categoryRepository: CategoryRepository, private topicService: TopicService) {
  }

  private categoryLib = categoryLib;
  private topicLib = topicLib;
  private searchLib = searchLib;

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

  public async getCidListByParent(cid: number): Promise<number[]> {
    return await this.categoryLib.getChildrenCids(cid);
  }

  private async getCidListByParents(cidList: number[]): Promise<number[]> {
    const childrenIdList = [];
    for (const cid of cidList) {
      childrenIdList.push(cid);
      const list = await this.getCidListByParent(cid);
      list.map(id => childrenIdList.push(id));
    }
    return childrenIdList;
  }

  public async getTopicByCidUid(cidList: number[], uidList: number[], start: number, stop: number, uid: number) {
    const childrenIdList = await this.getCidListByParents(cidList);
    const tidList: number[] = await this.categoryRepository.getTopicIdListByCidUid(childrenIdList, uidList, start, stop);
    const topics: Topic[] = await this.topicLib.getTopics(tidList, uid);
    return await this.topicService.getTopicsWithMainPosts(topics, uid);
  }

  public async getTopicByCidList(cidList: number[], uid: number, pageable: Pageable) {
    const childrenIdList = await this.getCidListByParents(cidList);
    const tidList: number[] = await this.categoryRepository.getTopicIdListByCidList(childrenIdList, pageable);
    const topics: Topic[] = await this.topicLib.getTopics(tidList, uid);
    return await this.topicService.getTopicsWithMainPosts(topics, uid);
  }

  public async search(key: string, page: number, itemsPerPage: number, uid) {
    const searchParam: SearchParam = {matchWords: 'any', query: key, page, itemsPerPage, uid, searchIn: 'titlesposts',
      sortBy: 'relevance'};
    return await this.searchLib.search(searchParam);
  }
}
