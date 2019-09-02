import { Injectable } from '@nestjs/common';
import * as privilegesLib from '@bbs/privileges';
import { UserPrivilege } from './user-privilege';

@Injectable()
export class PrivilegeService {
  private privilegesLib = privilegesLib;

  async getUserPrivilege(uid: number) {
    const privilege = await this.privilegesLib.global.get(uid);
    const userPrivilege: UserPrivilege = new UserPrivilege();
    userPrivilege.topicsReply = privilege['topics:reply'];
    userPrivilege.topicsCreate = privilege['topics:create'];
    userPrivilege.uploadPostImage = privilege['upload:post:image'];
    userPrivilege.uploadPostFile = privilege['upload:post:file'];
    userPrivilege.searchContent = privilege['search:content'];
    userPrivilege.searchUsers = privilege['search:users'];
    userPrivilege.searchTags = privilege['search:tags'];
    userPrivilege.viewUsers = privilege['view:users'];
    userPrivilege.viewTags = privilege['view:tags'];
    userPrivilege.viewGroups = privilege['view:groups'];
    return userPrivilege;
  }
}
