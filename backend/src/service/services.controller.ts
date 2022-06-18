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
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServicesService } from './services.service';

@Controller('/services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @Get('')
  async getAllServices(@Query() query) {
    return this.servicesService.getAllServices(query);
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Post('')
  async createSerive(@User() user, @Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createService({
      ...createServiceDto,
      userId: user.id,
    });
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Patch('/:serviceId')
  async updateSerive(
    @User() user,
    @Param('serviceId') offeredServiceId: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.servicesService.updateService({
      ...updateServiceDto,
      userId: user.id,
      offeredServiceId,
    });
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Delete('/:serviceId')
  async deleteSerive(
    @User() user,
    @Param('serviceId') offeredServiceId: string,
  ) {
    return this.servicesService.deleteService({
      offeredServiceId,
      userId: user.id,
    });
  }
}
