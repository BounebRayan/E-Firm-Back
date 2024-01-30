import { Injectable } from '@nestjs/common';
import { lawyerentity } from './entities/lawyer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LawyerService {
  constructor(
    @InjectRepository(lawyerentity)
    private repository: Repository<lawyerentity>,
  ) {}

  async findAllLawyers() {
    const lawyers = await this.repository.find();
    return lawyers;
  }

  async findLawyerById(id: string): Promise<lawyerentity> {
    return await this.repository.findOneBy({ id });
  }

  async findLawyerByEmail(email: string): Promise<lawyerentity> {
    return await this.repository.findOneBy({ email });
  }

  async updateProfilePicture(id: string, imageName: string): Promise<any> {
    const lawyer = await this.findLawyerById(id);
    lawyer.image = 'http://localhost:3000/files/' + imageName;
    return await this.repository.save(lawyer);
  }

  async updateLawyerRating(email: string, rating: number): Promise<any> {
    // Fetch lawyer, update rating, and save
    const lawyer = await this.repository.findOneBy({ email });
    if (!lawyer) {
      // Handle not found error
    }
    lawyer.rating = rating; // assuming you have a rating field on your entity
    return await this.repository.save(lawyer);
  }
}
