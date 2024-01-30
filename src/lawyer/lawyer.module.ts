import { Module } from '@nestjs/common';
import { LawyerController } from './lawyer.controller';
import { LawyerService } from './lawyer.service';
import { lawyerentity } from './entities/lawyer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawyerAuthModule } from 'src/lawyer-auth/lawyer-auth.module';
import { ClientAuthModule } from 'src/client-auth/client-auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([lawyerentity]),
    LawyerAuthModule,
    ClientAuthModule,
  ],
  controllers: [LawyerController],
  providers: [LawyerService],
})
export class LawyerModule {}
