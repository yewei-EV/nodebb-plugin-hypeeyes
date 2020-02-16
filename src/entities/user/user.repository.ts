import * as userLib from '@bbs/user';
import * as db from '@bbs/database';
export class UserRepository {
  private userLib = userLib;
  async incrementReputation(uid: number, value: number): Promise<number> {
    const newReputation = await this.userLib.incrementUserFieldBy(uid, 'reputation', value);
    console.log(newReputation);
    await db.sortedSetAdd('users:reputation', newReputation, uid);
    return newReputation;
  }
}
