import { Injectable } from '@nestjs/common';
import * as meta from '@bbs/meta';

@Injectable()
export class ConfigService {
  private config = meta.config;
  getConfig() {
    return this.config;
  }
}
