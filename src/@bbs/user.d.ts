import { User } from '../entities/user/user';

export function getUserField(uid: number, field: string): Promise<any>;
export function isAdministrator(uid: number): Promise<boolean>;
export function isGlobalModerator(uid: number): Promise<boolean>;
export function isModeratorOfAnyCategory(uid: number): Promise<boolean>;
export function getUserData(uid: number): Promise<User>;
export function getFollowing(uid: number, start: number, stop: number): Promise<User[]>;
export function incrementUserFieldBy(uid: number, field: string, value: number): Promise<number>;
export function isFollowing(uid: number, followedUid: number): Promise<boolean>;

declare class Blocks {
  filter(uid: number, ... $n: any[]): Promise<any>;
}
export const blocks: Blocks;
