import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class cliententity {
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

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  phoneNumber: string;

  @Column()
  age: number;

  @Column()
  city: string;
}
