import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardCategory } from '../interface/card.interface';
import { nextReviewDate } from '../utils/card.utils';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text' })
  answer: string;

  @Column({ type: 'varchar', length: 100 })
  tag: string;

  @Column({
    type: 'enum',
    enum: CardCategory,
    default: CardCategory.FIRST,
  })
  category: CardCategory;

  @Column({ type: Date, default: nextReviewDate(CardCategory.FIRST) })
  nextReview: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
