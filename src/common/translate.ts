import * as translator from '@bbs/translator';
import { Request, Response, NextFunction } from 'express';

/**
 * nestjs body is a object, not a string, so use this method change send behave;
 * @param req Request
 * @param resp Response
 * @param next NextFunction
 */
export function translateIntercept(req: Request, resp: Response, next: NextFunction) {
  const oldSend = resp.send;
  resp.send = function trans(body: string): Response {
    const language = 'zh-CN';
    const response = this;
    if (this.req.originalUrl.indexOf('hypeeyes') < 0) {
      return oldSend.apply(this, [body]);
    }
    if (!body || body.length <= 0 || body.indexOf('[[') < 0) {
      return oldSend.apply(this, [body]);
    }
    translator.translate(body, language, (translated: string) => {
      const unescaped = translator.unescape(translated);
      return oldSend.apply(response, [unescaped]);
    }).then(r => r);
    return this;
  };
  next();
}
