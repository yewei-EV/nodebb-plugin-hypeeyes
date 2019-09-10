import { UserPrivilege } from '../privilege/user-privilege';

export class Principal {
  uid: number = 0;
  unreadData: {};
  isAdmin: boolean;
  isGlobalMod: boolean;
  isMod: boolean;
  privileges: UserPrivilege;
  email: string;
  emailConfirmed: boolean;
  isEmailConfirmSent: boolean;

  isValid() {
    return this.uid !== 0;
  }
}
