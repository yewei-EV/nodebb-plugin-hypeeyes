export class User {
  uid = 0;
  email: string;
  emailConfirmed: boolean;
  isEmailConfirmSent: boolean;
  signature: string;
  followingCount: number;

  static convert(user) {
    user.emailConfirmed = user['email:confirmed'] === 1;
    delete user['email:confirmed'];
    return user;
  }
}
