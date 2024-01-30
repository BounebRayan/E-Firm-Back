import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class lawyerentity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  FamilyName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  speciality: string;

  @Column()
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  phoneNumber: string;

  @Column()
  age: number;

  @Column()
  city: string;

  @Column()
  rating: number;
}
