import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  type: string;
  @Column()
  description: string;
  @Column()
  date: Date;
  @Column()
  status: string;
  @Column()
  lawyerEmail: string;
  @Column()
  clientEmail: string;
  @Column('simple-array', { nullable: true })
  todos: string[];
  @Column({ type: 'boolean', default: false })
  isRated: boolean;
}
