import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { caseentity } from './entity/case.entity';
import { UpdateCaseDto } from './dtos/updateCase.dto';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(caseentity)
    private casesRepository: Repository<caseentity>,
  ) {}

  async getCases() {
    return await this.casesRepository.find();
  }

  async findCaseById(id: string): Promise<caseentity> {
    const Case = await this.casesRepository.findOneBy({ id });
    if (Case) {
      return Case;
    } else {
      throw new NotFoundException(`Case with ID ${id} not found`);
    }
  }

  async findCasesByLawyer(idLawyer: string) {
    return await this.casesRepository.findBy({ idLawyer: idLawyer });
  }

  async findCasesByClient(idClient: string) {
    return await this.casesRepository.findBy({ idClient: idClient });
  }

  async updateCase(id: string, dto: UpdateCaseDto) {
    const existingCase = await this.findCaseById(id);

    if (dto.description) {
      existingCase.description = dto.description;
    }
    if (dto.todos) {
      existingCase.todos = dto.todos;
    }
    if (dto.etat) {
      existingCase.etat = dto.etat;
    }

    return await this.casesRepository.save(existingCase);
  }
}
