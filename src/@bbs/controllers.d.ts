import { User } from '../entities/user/user';
import { Config } from '../entities/config/config';

interface Helper {
  getUserDataByUserSlug(userSlug: string, callerUid: number): Promise<User>;
}

interface Account {
  helpers: Helper;
}

interface Api {
  loadConfig(req: Request, callback: (error: Error, result: Config) => void);
}

export const accounts: Account;
export const api: Api;
