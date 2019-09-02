import { Injectable } from '@nestjs/common';
import { Navigation } from './navigation';
import * as navigationLib from '@bbs/navigation';

@Injectable()
export class NavigationService {

  private navigationLib = navigationLib;

  async getItems(uid: number): Promise<Navigation[]> {
    return await this.navigationLib.get(uid);
  }
}
