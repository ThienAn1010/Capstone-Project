import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { CreateOfferedServiceDto } from './dto/create-offered-service.dto';
import { UpdateOfferedServiceDto } from './dto/update-offered-service.dto';
import { OfferedServicesService } from './offered-services.service';

@Controller('/offered-services')
export class OfferedServicesController {
  constructor(
    private readonly offeredServicesService: OfferedServicesService,
  ) {}
  @Get('')
  async getAllOfferedServices(@Query() query) {
    return this.offeredServicesService.getAllOfferedServices(query);
  }
  @Get('/:serviceId')
  async getOfferedService(@Param('serviceId') offeredServiceId: string) {
    return this.offeredServicesService.getOfferedService(offeredServiceId);
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Post('')
  async createOfferedSerive(
    @User() user,
    @Body() createOfferedServiceDto: CreateOfferedServiceDto,
  ) {
    return this.offeredServicesService.createOfferedService({
      ...createOfferedServiceDto,
      userId: user.id,
    });
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Patch('/:serviceId')
  async updateOfferedSerive(
    @User() user,
    @Param('serviceId') offeredServiceId: string,
    @Body() updateOfferedServiceDto: UpdateOfferedServiceDto,
  ) {
    return this.offeredServicesService.updateOfferedService({
      ...updateOfferedServiceDto,
      userId: user.id,
      offeredServiceId,
    });
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Delete('/:serviceId')
  async deleteOfferedSerive(
    @User() user,
    @Param('serviceId') offeredServiceId: string,
  ) {
    return this.offeredServicesService.deleteOfferedService({
      offeredServiceId,
      userId: user.id,
    });
  }
}
