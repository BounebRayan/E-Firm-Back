import { BadRequestException, Injectable } from '@nestjs/common';

import { SignUpDto } from './dtos/signup.dto';
import { SignInDto } from './dtos/signin.dto';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { lawyerentity } from '../lawyer/entities/lawyer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PayloadDto } from './dtos/payload.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';

@Injectable()
export class LawyerAuthService {
  constructor(
    @InjectRepository(lawyerentity)
    private LawyerRepository: Repository<lawyerentity>,
    private myJwtService: JwtService,
  ) {}
  async signup(credentials: SignUpDto): Promise<SignInResponseDto> {
    const user = await this.LawyerRepository.findOneBy({
      email: credentials.email,
    });
    if (user) {
      throw new BadRequestException(
        'A lawyer with the same email address already exists try signing-in',
      );
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(credentials.password, salt);
      credentials.password = hashedPassword;
      const newUser = await this.LawyerRepository.save(credentials);
      delete newUser.password;
      const payload: PayloadDto = {
        email: newUser.email,
      };
      const jwt = this.myJwtService.sign(payload);
      return { token: jwt };
    }
  }

  async signin(credentials: SignInDto): Promise<SignInResponseDto> {
    const user = await this.LawyerRepository.findOneBy({
      email: credentials.email,
    });
    if (!user) {
      throw new BadRequestException('No lawyer by that email');
    } else {
      const isAuthenticated = await bcrypt.compare(
        credentials.password,
        user.password,
      );
      if (!isAuthenticated) {
        throw new BadRequestException('Wrong password');
      } else {
        const payload: PayloadDto = {
          email: user.email,
        };
        const jwt = this.myJwtService.sign(payload);
        return {
          token: jwt,
        };
      }
    }
  }
}
