export class Post {
  static convert(post: any): Post {
    post = Object.assign(new Post(), post);
    return post;
  }
  private _firstImg: string;
  private _fistCalendar: Date;
  content: string;
  tid: number;
  get firstImg(): string {
    let img = null;
    if (!this._firstImg) {
      const content = this.content;
      const regexp = /<img[ ]+src="([^"]*)"/g;
      let result;
      do {
        result = regexp.exec(content);
        if (result && result.length > 1 && !result[1].includes('nodebb-plugin-emoji/emoji')) {
          img = result[1];
          this._firstImg = img;
          break;
        }
      } while (result);
    } else {
      img = this._firstImg;
    }
    return img;
  }

  get fistCalendar(): Date {
    if (!this._fistCalendar) {
      const content = this.content;
      const regexp = new RegExp(/local, ([0-9]+),/);
      const result = regexp.exec(content);
      if (result && result.length > 1) {
        this._fistCalendar = new Date(+result[1]);
      }
    }
    return this._fistCalendar;
  }
}
