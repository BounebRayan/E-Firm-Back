import { Injectable } from '@nestjs/common';
import { cliententity } from './entities/client.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(cliententity)
    private repository: Repository<cliententity>,
  ) {}

  async findClientByEmail(email: string): Promise<cliententity> {
    return await this.repository.findOne({ where: { email } });
  }

  async findClientById(id: string): Promise<cliententity> {
    return await this.repository.findOne({ where: { id } });
  }

  async updatePicture(id: string, imageName: string): Promise<cliententity> {
    const client = await this.findClientById(id);
    client.image = 'http://localhost:3000/files/' + imageName;
    return await this.repository.save(client);
  }
}
