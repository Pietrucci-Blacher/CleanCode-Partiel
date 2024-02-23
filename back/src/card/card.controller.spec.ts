import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { cardStub, cardsStub, createCardStub } from './stub/card.stub';
import { Card } from './entity/card.entity';
import { AnswerCardDto } from './dto/answer-card.dto';

describe('CardController', () => {
  let controller: CardController;
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [
        CardService,
        {
          provide: CardService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(cardStub),
            findAll: jest.fn().mockResolvedValue(cardsStub),
            findByTag: jest.fn().mockResolvedValue(cardsStub),
            quizz: jest.fn().mockResolvedValue(cardsStub),
            create: jest.fn().mockResolvedValue(cardStub),
            update: jest.fn().mockResolvedValue(cardStub),
            answer: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CardController>(CardController);
    service = module.get<CardService>(CardService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cards', async () => {
      const result: Card[] = await controller.findAll(null);

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(cardsStub);
    });

    it('should return an array of cards by tag', async () => {
      const result: Card[] = await controller.findAll('tag');

      expect(service.findByTag).toHaveBeenCalledWith('tag');
      expect(result).toEqual(cardsStub);
    });
  });

  describe('findOne', () => {
    it('should return a card by id', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const result: Card = await controller.findOne(id);

      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(cardStub);
    });
  });

  describe('create', () => {
    it('should create a card', async () => {
      const result: Card = await controller.create(createCardStub);

      expect(service.create).toHaveBeenCalledWith(createCardStub);
      expect(result).toEqual(cardStub);
    });
  });

  describe('update', () => {
    it('should update a card', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const result: Card = await controller.update(id, createCardStub);

      expect(service.update).toHaveBeenCalledWith(id, createCardStub);
      expect(result).toEqual(cardStub);
    });
  });

  describe('remove', () => {
    it('should remove a card', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      await controller.remove(id);

      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });

  describe('quizz', () => {
    it('should return an array of cards', async () => {
      const date: string = '2021-01-01T00:00:00Z';
      const result: Card[] = await controller.quizz(date);

      expect(service.quizz).toHaveBeenCalledWith(date);
      expect(result).toEqual(cardsStub);
    });
  });

  describe('answer', () => {
    it('should answer to a card', async () => {
      const id: string = 'd7fa5d4a-cd55-4a41-8f6e-e27f952f4ef6';
      const data: AnswerCardDto = { isValid: true };
      await controller.answer(id, data);

      expect(service.answer).toHaveBeenCalledWith(id, data.isValid);
    });
  });
});
