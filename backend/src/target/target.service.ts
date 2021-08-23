import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Target } from './target.entity';

@Injectable()
export class TargetService {
  constructor(
    @Inject('TARGET_REPOSITORY')
    private targetRepository: Repository<Target>,
  ) {}

  findOne(id) {
    return this.targetRepository.findOne({ id });
  }

  findPublic() {
    return this.targetRepository.find({ select: ['id', 'longitude', 'latitude', 'name'] });
  }
}
