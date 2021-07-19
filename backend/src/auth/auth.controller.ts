import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Public } from './decorators/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @Public()
  async register(@Body() userData: User) {
    const user = await this.userService.create(userData);
    return this.authService.createToken(user);
  }

  @Post('login')
  @Public()
  async login(@Body() { email, password }: Partial<User>) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.createToken(user);
  }
}
