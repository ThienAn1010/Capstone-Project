import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Cookies } from 'src/decorator/cookie.decorator';
import { Response } from 'express';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserUpdateDto } from './dto/user-update-service.dto';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';
import { RoleGuard } from 'src/guard/role.guard';

@Controller('/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}
  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@User() user) {
    return user;
  }

  @Get(`/me/bookings`)
  @UseGuards(AuthGuard)
  async getAllMyBookings(@User() user) {
    return this.usersService.getAllMyBookings(user.id);
  }

  @UseGuards(RoleGuard('paperMaker'))
  @UseGuards(AuthGuard)
  @Get('/me/offered-services')
  async getMyOfferedServices(@User() user) {
    return this.usersService.getMyOfferedServices(user.id);
  }

  @Patch('/me')
  @UseGuards(AuthGuard)
  async updatedMe(
    @User() user,
    @Body() userUpdateDto: UserUpdateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, user: userData } = await this.usersService.updateMe(
      user.id,
      userUpdateDto,
    );
    res.cookie('accessToken', accessToken, {
      secure:
        this.configService.get('NODE_ENV') === 'production' ? true : false,
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      ...(this.configService.get('NODE_ENV') === 'production' && {
        sameSite: 'none',
      }),
    });
    return { accessToken: accessToken, user: userData };
  }
}
