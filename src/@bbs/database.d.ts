
export function getSortedSetUnion(param: {sets: string[], start: number, stop: number});
export function getSortedSetRevUnion(param: {sets: string[], start: number, stop: number});
export function sortedSetAdd(key: string, score: number, value: number);
export function getSortedSetRevRange(key: string, start: number, stop: number);
export function sortedSetUnionCard(keys: string[]);
