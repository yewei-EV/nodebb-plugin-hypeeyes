import { Injectable } from '@nestjs/common';

@Injectable()
export class TopicService {
  test(): string {
    return 'test';
  }
}
