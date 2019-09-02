import { User } from '../entities/user/user';

interface Helper {
  getUserDataByUserSlug(userSlug: string, callerUid: number): Promise<User>;
}

interface Account {
  helpers: Helper;
}

export const accounts: Account;
