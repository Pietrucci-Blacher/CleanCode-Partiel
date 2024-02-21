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

  /**
   * Get all cards
   *
   * @returns {Promise<Card[]>} all cards
   */
  findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  /**
   * Get a card by id
   *
   * @param {string} id - card id
   * @returns {Promise<Card>} card
   */
  findOne(id: string): Promise<Card> {
    return this.cardRepository.findOneBy({ id });
  }

  /**
   * Get all cards by tag
   *
   * @param {string} tag - tag of card
   * @returns {Promise<Card[]>} cards
   */
  findByTag(tag: string): Promise<Card[]> {
    return this.cardRepository.findBy({ tag });
  }

  /**
   * Create a card in the database
   *
   * @param {CreateCardDto} createCardDto - card to create
   * @returns {Promise<Card>} created card
   */
  create(createCardDto: CreateCardDto): Promise<Card> {
    const card: Card = new Card();
    card.question = createCardDto.question;
    card.answer = createCardDto.answer;
    card.tag = createCardDto.tag;

    return this.cardRepository.save(card);
  }

  /**
   * Update a card in the database
   *
   * @param {string} id - card id to update
   * @param {UpdateCardDto} updateCardDto - data to update
   * @returns {Promise<Card>} card updated
   */
  update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    return this.cardRepository.save({ id, ...updateCardDto });
  }

  /**
   * Delete a card in the database
   *
   * @async
   * @param {string} id - card id to delete
   * @returns {Promise<void>}
   */
  async remove(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }

  /**
   * Respond to a card
   *
   * @async
   * @param {string} id - card id to answer
   * @param {boolean} isValid - mark if the answer is valid or not
   * @throws {HttpException} - not found
   * @returns {Promise<void>}
   */
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

  /**
   * Get all cards to review
   *
   * @param {string} date - date to review
   * @returns {Promise<Card[]>} cards to review
   */
  quizz(date: string): Promise<Card[]> {
    const reviewDate: Date = new Date(date);
    return this.cardRepository.findBy({
      nextReview: LessThanOrEqual(reviewDate),
    });
  }
}
