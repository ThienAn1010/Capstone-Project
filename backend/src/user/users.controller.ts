import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Cookies } from 'src/decorator/cookie.decorator';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/me')
  @UseGuards(AuthGuard)
  async getMe(@User() user) {
    return user;
  }
}
