import {Controller, Get, Param, Query} from '@nestjs/common';
import {CurPrincipal} from './principal.decorator';
import {Principal} from './principal';
import {User} from './user';
import {UserService} from './user.service';
import {CryptHelper} from './CryptHelper';


@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get('createCrypt')
  async createCrypt(@Query('reputation') reputation: number,
                    @Query('user') user: string) {
    const cryptHelper: CryptHelper = new CryptHelper();
    return cryptHelper.EncryptByKey(user + "/" + reputation);
  }

  @Get('transplant')
  async transplantReputation(@CurPrincipal() curPrincipal: Principal, @Query('crypt') crypt: string) {
    const cryptHelper: CryptHelper = new CryptHelper();
    console.log(crypt);
    let decrypt = cryptHelper.DecryptByKey(crypt);
    console.log(decrypt);
    let reputation = decrypt.split("/")[1];
    console.log(reputation);
    // if (curPrincipal) {
    //   const uid = curPrincipal.uid;
    //   let currentReputation = await this.userService.getReputation(uid);
    //   return await this.userService.increaseReputation(uid, currentReputation / 10 + reputation);
    // }
    return null;
  }

  @Get('cur-user')
  async getCurUser(@CurPrincipal() curPrincipal: Principal): Promise<User> {
    if (curPrincipal) {
      const uid = curPrincipal.uid;
      return await this.userService.getUserById(uid);
    }
    return null;
  }

  @Get('following')
  async getFollowing(@Query('start') start: number,
                     @Query('stop') stop: number,
                     @CurPrincipal() curPrincipal: Principal): Promise<User[]> {
    start = +start;
    stop = +stop;
    return this.userService.getFollowing(curPrincipal.uid, start, stop);
  }

  @Get(':uid')
  async getByUid(@Param('uid') uid: number): Promise<User> {
    uid = +uid;
    return await this.userService.getUserById(uid);
  }

  @Get(':uid/reputation')
  async increaseReputation(@Param('uid') uid: number, @Query('reputation') reputation: number) {
    reputation = +reputation;
    if (reputation === 0) {
      return await this.userService.getReputation(uid);
    }
    return await this.userService.increaseReputation(uid, reputation);
  }
}
