
interface Global {
  get(uid: number): Promise<{}>;
}

export let global: Global;
