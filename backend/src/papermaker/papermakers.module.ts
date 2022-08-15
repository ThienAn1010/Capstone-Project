import { Module } from '@nestjs/common';
import { PapermakerController } from './papermakers.controller';
import { PapermakerService } from './papermakers.service';

@Module({
  controllers: [PapermakerController],
  providers: [PapermakerService],
})
export class PapermakerModule {}
