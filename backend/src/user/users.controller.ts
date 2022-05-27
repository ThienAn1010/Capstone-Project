import { Controller, Get } from '@nestjs/common';
import { Cookies } from 'src/decorator/cookie.decorator';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/me')
  async getMe(@Cookies('accessToken') accessToken: string) {
    return this.usersService.getMe(accessToken);
  }
}
