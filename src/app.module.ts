import { Module } from '@nestjs/common';
import { EntityModule } from './entities/entity.module';

@Module({
  imports: [
    EntityModule,
  ],
})
export class AppModule {}
