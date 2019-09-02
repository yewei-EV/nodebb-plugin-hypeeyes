import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {

  constructor(private userService: UserService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    if (req.session && !req.session.user && req.loggedIn && req.uid) {
      req.session.principal = await this.userService.getPrincipalById(+req.uid);
    } else {
      req.session.principal = null;
    }
    return next.handle();
  }
}
