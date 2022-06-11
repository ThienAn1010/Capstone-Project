import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';

@Module({
  providers: [FacebookService],
  exports: [FacebookService],
})
export class FacebookModule {}
