import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { ClientAuthService } from './client-auth.service';
import { cliententity } from 'src/client/entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientAuthController } from './client-auth.controller';
import * as dotenv from 'dotenv';
import { JwtClientStrategy } from './jwt-client.strategy';
dotenv.config();

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    TypeOrmModule.forFeature([cliententity]),
  ],
  providers: [ClientAuthService, JwtClientStrategy],
  controllers: [ClientAuthController],
})
export class ClientAuthModule {}
