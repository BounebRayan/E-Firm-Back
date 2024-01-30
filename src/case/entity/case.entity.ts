import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CasesStatusEnum } from '../enums/CasesStatusEnum';

@Entity()
export class caseentity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: CasesStatusEnum,
    default: CasesStatusEnum.waiting,
  })
  etat: CasesStatusEnum;
  @Column('simple-array')
  todos: string[];

  @Column()
  idLawyer: string;
  @Column()
  idClient: string;
}
