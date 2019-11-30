import { Router } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as mime from 'mime-types';

export async function angularRoute(router: Router) {
  router.get('/hypeeyes/web*', (req, res) => {
    const url = req.path;
    let contentType: string|string[] = 'text/html';
    const newUrl = url.substring(13);
    let file = path.resolve('../hypeeyes-web/dist/hypeeyes-web/') + newUrl;
    if (fs.existsSync(file) && newUrl.length > 1) {
      contentType = mime.lookup(path.extname(file));
    } else {
      file = path.resolve('../hypeeyes-web/dist/hypeeyes-web/index.html');
    }

    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    res.sendFile(file);
  });
}
