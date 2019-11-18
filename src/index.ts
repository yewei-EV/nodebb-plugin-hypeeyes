import './common/require';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Router } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { UserInterceptor } from './entities/user/user.interceptor';
import { ConvertInterceptor } from './common/convert-interceptor';
import { UserService } from './entities/user/user.service';
import { translateIntercept } from './common/translate';
export async function init(params: {router: Router, app: Router}, callback: () => {}) {
  const router: Router = Router();
  params.router.use('/hypeeyes/api/', router);
  params.app.use(translateIntercept);
  const app = await NestFactory.create(AppModule, new ExpressAdapter(router));
  await app.useGlobalInterceptors(new UserInterceptor(app.get(UserService)));
  // await app.useGlobalInterceptors(new TranslateInterceptor());
  await app.useGlobalInterceptors(new ConvertInterceptor());
  await app.init();
}
