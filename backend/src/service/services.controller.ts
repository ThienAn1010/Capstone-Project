import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
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
  async createSerive(@User() user) {
    return user;
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Patch('')
  async updateSerive(@User() user) {
    return user;
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Delete('')
  async deleteSerive(@User() user) {
    return user;
  }
}
