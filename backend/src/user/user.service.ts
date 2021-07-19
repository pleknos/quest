import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash }  from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    try {
      userData.password = await hash(userData.password, 10)
      const newUser = this.userRepository.create(userData);
      return this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  findOne(id: number): Promise<User> {
    try {
      return this.userRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  findOneByEmail(email: string): Promise<User> {
    try {
      return this.userRepository.findOne({ email });
    } catch (error) {
      throw error;
    }
  }


}
