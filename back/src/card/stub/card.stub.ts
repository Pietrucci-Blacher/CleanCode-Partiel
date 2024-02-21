import { CreateCardDto } from '../dto/create-card.dto';
import { CardCategory } from '../interface/card.interface';
import { Card } from '../entity/card.entity';

const date: Date = new Date();

export const cardStub: Card = {
  id: 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6',
  question: "Qu'est-ce qui est long et dur et qui commence par un 'C' ?",
  answer: 'Un chemin. Bien sûr !',
  tag: 'blague',
  category: CardCategory.FIRST,
  nextReview: new Date(date.setHours(24, 0, 0, 0)),
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const cardsStub: Card[] = [cardStub, cardStub, cardStub];

export const createCardStub: CreateCardDto = {
  question: "Qu'est-ce qui est long et dur et qui commence par un 'C' ?",
  answer: 'Un chemin. Bien sûr !',
  tag: 'blague',
};
