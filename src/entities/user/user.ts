export class User {
  uid: number;
  email: string;
  emailConfirmed: boolean;
  isEmailConfirmSent: boolean;
  signature: string;

  static convert(user) {
    user.emailConfirmed = user['email:confirmed'] === 1;
    delete user['email:confirmed'];
    return user;
  }
}
