import { UserPrivilege } from '../privilege/user-privilege';
import { User } from './user';

export class Principal extends User {
  unreadData: {};
  isAdmin: boolean;
  isGlobalMod: boolean;
  isMod: boolean;
  privileges: UserPrivilege;

  isValid() {
    return this.uid !== 0;
  }
}
