import { Injectable } from '@nestjs/common';
import * as meta from '@bbs/meta';
import * as controllers from '@bbs/controllers';
import * as util from 'util';
import { Config } from './config';

@Injectable()
export class ConfigService {
  private config = meta.config;
  async getConfig(req: Request) {
    const loadConfigAsync = util.promisify(controllers.api.loadConfig);
    const config = await loadConfigAsync(req);
    return Config.convert({ ...config, ...this.config});
  }
}
