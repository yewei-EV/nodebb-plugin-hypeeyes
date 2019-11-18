export class Post {
  static convert(post: any): Post {
    post = Object.assign(post, Post);
    return post;
  }
}
