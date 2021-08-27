import { Body, Controller, ForbiddenException, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/decorators/public.decorator';
import { User } from './user.entity';
import * as js2xmlparser from 'js2xmlparser';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Post()
  @Public()
  async getAll(@Body() { password }) {
    if (password === process.env.ADMIN_PASSWORD) {
      const users = await this.userService.find();
      return js2xmlparser.parse('users', users);
    } else {
      throw new ForbiddenException('Неправильный запрос');
    }
  }
}