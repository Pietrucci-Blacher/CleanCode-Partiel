import { Injectable } from '@nestjs/common';
import { CardCategory } from '../card/interface/card.interface';

@Injectable()
export class UtilsService {
  /**
   * Returns the next category of a card.
   *
   * @param {CardCategory} category - current category of the card
   * @returns {CardCategory} next category of the card
   */
  nextCardCategory(category: CardCategory): CardCategory {
    const categories = Object.values(CardCategory);
    const index = categories.indexOf(category);

    if (index === -1) return CardCategory.FIRST;
    if (index === categories.length - 1) return categories[0];

    return categories[index + 1];
  }

  /**
   * Returns the next review date of a card.
   *
   * @param {CardCategory} category - current category of the card
   * @returns {Date} next review date of the card
   */
  nextReviewDate(category: CardCategory): Date {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const nextReview = new Date(now);

    switch (category) {
      case CardCategory.FIRST:
        nextReview.setDate(now.getDate() + 1);
        break;
      case CardCategory.SECOND:
        nextReview.setDate(now.getDate() + 2);
        break;
      case CardCategory.THIRD:
        nextReview.setDate(now.getDate() + 4);
        break;
      case CardCategory.FOURTH:
        nextReview.setDate(now.getDate() + 8);
        break;
      case CardCategory.FIFTH:
        nextReview.setDate(now.getDate() + 16);
        break;
      case CardCategory.SIXTH:
        nextReview.setDate(now.getDate() + 32);
        break;
      case CardCategory.SEVENTH:
        return null;
    }

    return nextReview;
  }
}
