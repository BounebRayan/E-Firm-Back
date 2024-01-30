import { Module } from '@nestjs/common';
import { LawyerAuthService } from './lawyer-auth.service';
import { LawyerAuthController } from './lawyer-auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { lawyerentity } from 'src/lawyer/entities/lawyer.entity';
import * as dotenv from 'dotenv';
import { JwtLawyerStrategy } from './jwt-lawyer.strategy';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([lawyerentity]),
  ],
  providers: [LawyerAuthService, JwtLawyerStrategy],
  controllers: [LawyerAuthController],
})
export class LawyerAuthModule {}
