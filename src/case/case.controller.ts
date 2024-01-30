import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CaseService } from './case.service';
import { UpdateCaseDto } from './dtos/updateCase.dto';

@Controller('cases')
export class CaseController {
  constructor(private myCaseService: CaseService) {}

  @Get()
  async getCases() {
    return await this.myCaseService.getCases();
  }

  @Get('/lawyerCases/:id')
  async lawyerCases(@Param('id') id: string) {
    return await this.myCaseService.findCasesByLawyer(id);
  }

  @Get('/clientCases/:id')
  async clientCases(@Param('id') id: string) {
    return await this.myCaseService.findCasesByClient(id);
  }

  @Patch(':id')
  updateCase(@Param('id') id: string, @Body() caseDto: UpdateCaseDto) {
    return this.myCaseService.updateCase(id, caseDto);
  }
}
