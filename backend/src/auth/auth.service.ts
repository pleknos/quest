import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);
    return await compare(password, user.password) ? user : null
  }

  createToken(user) {
    if (user) {
      return {
        access_token: this.jwtService.sign({ id: user.id }),
      };
    } else {
      throw new ForbiddenException();
    }
  }
}
