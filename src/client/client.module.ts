import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cliententity } from './entities/client.entity';
import { ClientAuthModule } from 'src/client-auth/client-auth.module';
import { LawyerAuthModule } from 'src/lawyer-auth/lawyer-auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([cliententity]),
    ClientAuthModule,
    LawyerAuthModule,
  ],
  controllers: [ClientController],
  providers: [TypeOrmModule, ClientService],
})
export class ClientModule {}
