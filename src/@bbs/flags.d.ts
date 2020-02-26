export interface FlagInfo {
  uid: number;
  type: 'post'|'user';
  reason: string;
  id: number;
}

export interface FlagObject {
  type: 'post'|'user';
}

export function validate(data: FlagInfo): Promise<void>;
export function create(type: 'post'|'user', id: number, uid: number, reason: string, timestamp: number): Promise<FlagObject>;
export function notify(flagObj: FlagObject, uid: number): Promise<void>;
