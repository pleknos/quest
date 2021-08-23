import { Body, Controller, ForbiddenException, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Public } from '../auth/decorators/public.decorator';
import { User } from './user.entity';

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
      return {
        length: users.length,
        users,
      };
    } else {
      throw new ForbiddenException('Неправильный запрос');
    }
  }
}
