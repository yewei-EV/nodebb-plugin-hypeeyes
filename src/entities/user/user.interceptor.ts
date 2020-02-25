import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { Response } from 'express';
const passport = require.main.require('passport');

@Injectable()
export class UserInterceptor implements NestInterceptor {

  constructor(private userService: UserService) {
  }

  private async getPrincipal(req) {
    if (req.session && !req.session.user && req.loggedIn && req.uid) {
      req.session.principal = await this.userService.getPrincipalById(+req.uid);
    } else {
      req.session.principal = null;
    }
  }

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();
    // tslint:disable-next-line:no-shadowed-variable
    const authenticate = (req: any, res: any) =>
      new Promise((resolve, reject) => {
        passport.authenticate(
          'bearer',
          {session: false},
          (err, user) => {
            if (err) {
              reject(new Error(err));
            } else if (!user) {
              reject(new Error('Not authenticated'));
            }
            resolve(user);
          })(req, res);
      });

    const login = (user) =>
      new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) {
            reject(new Error(err));
          }
          resolve(user);
        });
     });

    if (req.headers.hasOwnProperty('authorization')) {
      const user: any = await authenticate(req, res);
      if (user) {
        // If the token received was a master token, a _uid must also be present for all calls
        if (user.hasOwnProperty('uid')) {
          if (await login(user)) {
            req.uid = user.uid;
            req.loggedIn = req.uid > 0;
          }
        } else if (user.hasOwnProperty('master') && user.master === true) {
          if (req.body.hasOwnProperty('_uid') || req.query.hasOwnProperty('_uid')) {
            user.uid = req.body._uid || req.query._uid;
            delete user.master;

            if (await login(user)) {
              req.uid = user.uid;
              req.loggedIn = req.uid > 0;
            }
          } else {
            res.status(400).json({
              status: 400,
              reason: 'params-missing',
              describe: 'Required parameters were missing from this API call, please see the "params" property',
            });
          }
        }
      }
    }
    await this.getPrincipal(req);
    return next.handle();
  }
}
