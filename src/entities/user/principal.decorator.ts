import { createParamDecorator } from '@nestjs/common';
import { User } from './user';

export const CurPrincipal = createParamDecorator((data, req): User => {
  const uid = +req.uid;
  const loggedIn = req.loggedIn;
  if (uid && loggedIn) {
    return req.session.principal;
  }
  return null;
});
