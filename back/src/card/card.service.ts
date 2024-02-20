import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entity/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { nextCardCategory, nextReviewDate } from './utils/card.utils';
import { CardCategory } from './interface/card.interface';
import { LessThanOrEqual } from 'typeorm';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  findOne(id: string): Promise<Card> {
    return this.cardRepository.findOneBy({ id });
  }

  findByTag(tag: string): Promise<Card[]> {
    return this.cardRepository.findBy({ tag });
  }

  create(createCardDto: CreateCardDto): Promise<Card> {
    const card: Card = new Card();
    card.question = createCardDto.question;
    card.answer = createCardDto.answer;
    card.tag = createCardDto.tag;

    return this.cardRepository.save(card);
  }

  update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardRepository.save({ id, ...updateCardDto });
  }

  async remove(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }

  async answer(id: string, isValid: boolean): Promise<void> {
    const card: Card = await this.cardRepository.findOneBy({ id });
    if (!card) throw new HttpException('Card not found', HttpStatus.NOT_FOUND);

    if (isValid && card.category === CardCategory.SEVENTH) {
      await this.cardRepository.delete(id);
      return;
    }

    const category: CardCategory = nextCardCategory(card.category);
    card.category = isValid ? category : CardCategory.FIRST;
    card.nextReview = nextReviewDate(isValid ? category : CardCategory.FIRST);

    await this.cardRepository.save(card);
  }

  quizz(date: string): Promise<Card[]> {
    const reviewDate: Date = new Date(date);
    return this.cardRepository.findBy({
      nextReview: LessThanOrEqual(reviewDate),
    });
  }
}
