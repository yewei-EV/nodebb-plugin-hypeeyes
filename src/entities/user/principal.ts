import { UserPrivilege } from '../privilege/user-privilege';

export class Principal {
  uid: number;
  unreadData: {};
  isAdmin: boolean;
  isGlobalMod: boolean;
  isMod: boolean;
  privileges: UserPrivilege;
  email: string;
  emailConfirmed: boolean;
  isEmailConfirmSent: boolean;
}
