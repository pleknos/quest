import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  latitude: string;

  @Column({ nullable: true })
  longitude: string;

  @Column({ length: 1000, nullable: true })
  pic: string;

  @Column({ length: 1000 })
  address: string;

  @Column({ length: 1000, nullable: true })
  about: string;

  @Column({ default: false })
  adult: boolean;

  @Column({ default: false })
  start: boolean;
}
