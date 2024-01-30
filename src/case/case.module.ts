import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { caseentity } from './entity/case.entity';
import { CaseController } from './case.controller';
import { CaseService } from './case.service';

@Module({
  imports: [TypeOrmModule.forFeature([caseentity])],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}
