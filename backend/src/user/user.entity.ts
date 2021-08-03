import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';


@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  age: string;

  @Column()
  children: boolean;

  @Column()
  players: number;
}
