import { Router } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import mime from 'mime-type/with-db';

export async function angularRoute(router: Router) {
  router.get('/hypeeyes/web*', (req, res) => {
    const url = req.path;
    let contentType: string|string[] = 'text/html';
    const contentTypeMap = {
      css: 'text/css',
      js: 'text/javascript',
      json: 'application/json',
    };
    let file = path.resolve('../hypeeyes-web/dist/hypeeyes-web/') + + url.substring(14);
    if (fs.existsSync(file)) {
      contentType = mime.lookup(path.extname(file));
    } else {
      file = path.resolve('../hypeeyes-web/dist/hypeeyes-web/index.html');
    }

    res.setHeader('Content-Type', contentType);
    res.sendFile(file);
  });
}
