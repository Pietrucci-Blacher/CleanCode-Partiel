import { useState, useCallback } from 'react';
import * as cardService from '@/services/cardService';

interface Card {
  question: string;
  answer: string;
  tag: string;
}

interface UseCardHook {
  cards: Card[];
  loading: boolean;
  error: string | null;
  createCard: (payload: Card) => Promise<void>;
  getCardById: (cardId: string) => Promise<void>;
  getAllCards: () => Promise<void>;
  updateCardById: (cardId: string, payload: Card) => Promise<void>;
  deleteCardById: (cardId: string) => Promise<void>;
  answerCard: (cardId: string, answer: string) => Promise<void>;
}

export const useCards = (): UseCardHook => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiResponse = useCallback(async <T>(operation: () => Promise<T>): Promise<T | undefined> => {
    setLoading(true);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(message);
      return undefined;
    } finally {
      setLoading(false);
    }
  }, []);

  const createCard = useCallback(async (payload: Card) => {
    await handleApiResponse(() => cardService.createCard(payload));
  }, [handleApiResponse]);

  const getCardById = useCallback(async (cardId: string) => {
    const card = await handleApiResponse(() => cardService.getCardById(cardId));
    if (card) {
      setCards(prevCards => {
        const exists = prevCards.some(existingCard => existingCard.question === card.question);
        return exists ? prevCards : [...prevCards, card];
      });
    }
  }, [handleApiResponse]);

  const getAllCards = useCallback(async () => {
    const allCards = await handleApiResponse(cardService.getAllCards);
    if (Array.isArray(allCards)) {
      setCards(allCards);
    }
  }, [handleApiResponse]);

  const updateCardById = useCallback(async (cardId: string, payload: Card) => {
    await handleApiResponse(() => cardService.updateCardById(cardId, payload));
  }, [handleApiResponse]);

  const deleteCardById = useCallback(async (cardId: string) => {
    await handleApiResponse(() => cardService.deleteCardById(cardId));
  }, [handleApiResponse]);

  const answerCard = useCallback(async (cardId: string, answer: string) => {
    const payload = { answer };
    await handleApiResponse(() => cardService.answerCard(cardId, payload));
  }, [handleApiResponse]);

  return {
    cards,
    loading,
    error,
    createCard,
    getCardById,
    getAllCards,
    updateCardById,
    deleteCardById,
    answerCard,
  };
};
