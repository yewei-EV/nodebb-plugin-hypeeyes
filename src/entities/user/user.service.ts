import { Injectable } from '@nestjs/common';
import * as userLib from '@bbs/user';
import { Principal } from './principal';
import { PrivilegeService } from '../privilege/privilege.service';
import { User } from './user';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private privilegeService: PrivilegeService, private userRepository: UserRepository) {}

  private userLib = userLib;
  async getPrincipalById(uid: number) {
    const principal = new Principal();
    principal.isAdmin = await this.userLib.isAdministrator(uid);
    principal.isGlobalMod = await this.userLib.isGlobalModerator(uid);
    principal.isMod = await this.userLib.isModeratorOfAnyCategory(uid);
    principal.privileges = await this.privilegeService.getUserPrivilege(uid);
    principal.uid = uid;
    let user = await this.userLib.getUserData(uid);
    user = User.convert(user);
    principal.email = user.email;
    principal.emailConfirmed = user.emailConfirmed;
    principal.isEmailConfirmSent = user.isEmailConfirmSent;
    return principal;
  }
  async getUserById(uid: number): Promise<User> {
    const user = await this.userLib.getUserData(uid);
    return User.convert(user);
  }
  async getFollowing(uid: number, start: number, stop: number): Promise<User[]> {
    return await this.userLib.getFollowing(uid, start, stop);
  }
  async increaseReputation(uid: number, value: number): Promise<number> {
    return await this.userRepository.incrementReputation(uid, value);
  }
  async getReputation(uid: number): Promise<number> {
    return await this.userLib.getUserField(uid, 'reputation');
  }
}
