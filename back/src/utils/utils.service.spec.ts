import { Test, TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { CardCategory } from '../card/interface/card.interface';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsService],
    }).compile();

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('nextCardCategory', () => {
    it('should return the next card category', () => {
      for (const [category, nextCategory] of [
        [CardCategory.FIRST, CardCategory.SECOND],
        [CardCategory.SECOND, CardCategory.THIRD],
        [CardCategory.THIRD, CardCategory.FOURTH],
        [CardCategory.FOURTH, CardCategory.FIFTH],
        [CardCategory.FIFTH, CardCategory.SIXTH],
        [CardCategory.SIXTH, CardCategory.SEVENTH],
        [CardCategory.SEVENTH, CardCategory.FIRST],
      ]) {
        const result: CardCategory = service.nextCardCategory(category);
        expect(result).toBe(nextCategory);
      }
    });
    it('should return the first card category if the current category is not found', () => {
      const result: CardCategory = service.nextCardCategory(
        'invalid' as CardCategory,
      );
      expect(result).toBe(CardCategory.FIRST);
    });
  });

  describe('nextReviewDate', () => {
    it('should return next review date', () => {
      for (const [category, expected] of [
        [CardCategory.FIRST, 1],
        [CardCategory.SECOND, 2],
        [CardCategory.THIRD, 4],
        [CardCategory.FOURTH, 8],
        [CardCategory.FIFTH, 16],
        [CardCategory.SIXTH, 32],
      ]) {
        const result: Date = service.nextReviewDate(category as CardCategory);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        now.setDate(now.getDate() + (expected as number));

        expect(result).toEqual(now);
      }
    });
  });
});
