import { Controller, Get } from '@nestjs/common';
import { CurPrincipal } from './principal.decorator';
import { Principal } from './principal';
import { User } from './user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

  constructor(private userService: UserService) {}

  @Get('cur-user')
  private async getCurUser(@CurPrincipal() curPrincipal: Principal): Promise<User> {
    if (curPrincipal) {
      const uid = curPrincipal.uid;
      return await this.userService.getUserById(uid);
    }
    return null;
  }
}
