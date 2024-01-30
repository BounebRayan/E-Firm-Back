import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lawyerentity } from '../lawyer/entities/lawyer.entity';
import { PayloadDto } from './dtos/payload.dto';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtLawyerStrategy extends PassportStrategy(
  Strategy,
  'jwt-lawyer',
) {
  constructor(
    @InjectRepository(lawyerentity)
    private LawyerRepository: Repository<lawyerentity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadDto) {
    const user = this.LawyerRepository.findOneBy({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
