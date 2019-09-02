import { UserInterceptor } from './user.interceptor';
import { UserService } from './user.service';
import { PrivilegeService } from '../privilege/privilege.service';

describe('UserInterceptor', () => {
  it('should be defined', () => {
    expect(new UserInterceptor(new UserService(new PrivilegeService()))).toBeDefined();
  });
});
