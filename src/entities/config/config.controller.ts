import { Controller, Get, Req } from '@nestjs/common';
import { ConfigService } from './config.service';

@Controller('configs')
export class ConfigController {

  constructor(private configService: ConfigService) {}

  @Get()
  async getConfig(@Req() req) {
    return await this.configService.getConfig(req);
  }
}
