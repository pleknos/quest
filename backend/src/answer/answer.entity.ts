import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetId: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  feedback: string;

  @Column()
  selfie: string;
}
