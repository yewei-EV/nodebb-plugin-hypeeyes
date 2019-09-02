import { Controller, Get } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { CurPrincipal } from '../user/principal.decorator';
import { Principal } from '../user/principal';
import { UserPrivilege } from '../privilege/user-privilege';

@Controller('navigation')
export class NavigationController {
  constructor(private navigationService: NavigationService) {
  }

  @Get()
  async getItems(@CurPrincipal() principal: Principal) {
    const uid = principal ? principal.uid : 0;
    let items = await this.navigationService.getItems(uid);
    const privileges = principal ? principal.privileges : new UserPrivilege();
    items = items.filter((item) => {
      if (item.route.indexOf('/tags') >= 0 && !privileges.viewTags) {
        return false;
      }
      if (item.route.indexOf('/users') >= 0 && !privileges.viewUsers) {
        return false;
      }
      return !(item.route.indexOf('/groups') >= 0 && !privileges.viewGroups);
    });
    return items;
  }

}
