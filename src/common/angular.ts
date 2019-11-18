import { Router } from 'express';
import * as path from 'path';
import * as urlUtil from 'url';

export async function angularRoute(router: Router) {
  router.get('/hypeeyes/web*', (req, res) => {
    const url = req.path;
    let contentType = 'text/html';
    const contentTypeMap = {
      css: 'text/css',
      js: 'text/javascript',
      json: 'application/json',
    };
    let file = path.resolve('../hypeeyes-web/dist/hypeeyes-web/index.html');
    for (const postfix of Object.keys(contentTypeMap)) {
      if (url.endsWith(postfix)) {
        contentType = contentTypeMap[postfix];
        file = path.resolve('../hypeeyes-web/dist/hypeeyes-web/' + url.substring(14));
        break;
      }
    }
    res.setHeader('Content-Type', contentType);
    res.sendFile(file);
  });
}
