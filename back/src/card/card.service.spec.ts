import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Card } from './entity/card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { cardStub, cardsStub } from './stub/card.stub';
import { CardCategory } from './interface/card.interface';
import { LessThanOrEqual } from 'typeorm';
import { UtilsService } from '../utils/utils.service';
import { UtilsModule } from '../utils/utils.module';

describe('CardService', () => {
  let service: CardService;
  let repository: Repository<Card>;
  let utilsService: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilsModule],
      providers: [
        CardService,
        {
          provide: getRepositoryToken(Card),
          useValue: {
            find: jest.fn().mockResolvedValue(cardsStub),
            findBy: jest.fn().mockResolvedValue(cardsStub),
            findOneBy: jest.fn().mockResolvedValue(cardStub),
            save: jest.fn().mockResolvedValue(cardStub),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CardService>(CardService);
    repository = module.get<Repository<Card>>(getRepositoryToken(Card));
    utilsService = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a card', async () => {
      const createdCard: CreateCardDto = {
        question: 'Quel est le comble pour un électricien ?',
        answer: 'De ne pas être au courant.',
        tag: 'nul',
      };

      jest.spyOn(repository, 'save').mockResolvedValue({
        ...cardStub,
        ...createdCard,
      });

      const result: Card = await service.create(createdCard);

      const expected: Card = {
        ...cardStub,
        ...createdCard,
      };

      expect(repository.save).toHaveBeenCalledWith(createdCard);
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return an array of cards', async () => {
      const result: Card[] = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(cardsStub);
    });

    it('should return an empty array', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      const result: Card[] = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a card', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const result: Card = await service.findOne(id);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(cardStub);
    });
  });

  describe('findByTag', () => {
    it('should return an array of cards', async () => {
      const result: Card[] = await service.findByTag('blague');

      expect(repository.findBy).toHaveBeenCalledWith({ tag: 'blague' });
      expect(result).toEqual(cardsStub);
    });
  });

  describe('update', () => {
    it('should update a card', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const updatedCard: UpdateCardDto = {
        question: 'Quel est le comble pour un électricien ?',
        answer: 'De ne pas être au courant.',
      };

      jest.spyOn(repository, 'save').mockResolvedValue({
        ...cardStub,
        ...updatedCard,
      });

      const result: Card = await service.update(id, updatedCard);

      const expected: Card = {
        ...cardStub,
        ...updatedCard,
      };

      expect(repository.save).toHaveBeenCalledWith({ id, ...updatedCard });
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should delete a card', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      await service.remove(id);
      expect(repository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('answer', () => {
    it('should pass card in next category', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const cardData: Card = { ...cardStub };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(cardData);

      await service.answer(id, true);

      const expected: Card = {
        ...cardStub,
        category: CardCategory.SECOND,
        nextReview: utilsService.nextReviewDate(CardCategory.SECOND),
      };

      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.save).toHaveBeenCalledWith(expected);
      expect(cardData).toEqual(expected);
    });

    it('should throw a 404 error', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      await expect(
        service.answer('d7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6', true),
      ).rejects.toThrowError('Card not found');
    });

    it('should delete card', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const cardData: Card = { ...cardStub, category: CardCategory.SEVENTH };
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(cardData);
      jest.spyOn(repository, 'delete');

      await service.answer(id, true);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.delete).toHaveBeenCalledWith(id);
    });

    it('should pass card in first category', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const cardData: Card = { ...cardStub, category: CardCategory.SEVENTH };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(cardData);

      await service.answer(id, false);

      const expected: Card = {
        ...cardStub,
        category: CardCategory.FIRST,
        nextReview: utilsService.nextReviewDate(CardCategory.FIRST),
      };

      expect(repository.findOneBy).toHaveBeenCalledWith({ id });
      expect(repository.save).toHaveBeenCalledWith(expected);
      expect(cardData).toEqual(expected);
    });
  });

  describe('quizz', () => {
    it('should return an array of cards', async () => {
      const date: string = '2021-01-01T00:00:00.000Z';
      const result: Card[] = await service.quizz(date);

      expect(repository.findBy).toHaveBeenCalledWith({
        nextReview: LessThanOrEqual(new Date(date)),
      });
      expect(result).toEqual(cardsStub);
    });
  });
});
