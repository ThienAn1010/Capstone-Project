import { Module } from '@nestjs/common';
import { OfferedServicesController } from './offered-services.controller';
import { OfferedServicesService } from './offered-services.service';

@Module({
  controllers: [OfferedServicesController],
  providers: [OfferedServicesService],
})
export class OfferedServicesModule {}
