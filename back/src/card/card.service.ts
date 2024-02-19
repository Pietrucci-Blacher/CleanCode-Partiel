import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './entity/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

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
    const card = new Card();
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

  answer(id: string, isValid: boolean): Promise<Card> {
    // TODO: Implement answer logic
    return this.cardRepository.save({ id, isValid });
  }

  quizz(): Promise<Card[]> {
    // TODO: Implement quizz logic
    return this.cardRepository.find();
  }
}
