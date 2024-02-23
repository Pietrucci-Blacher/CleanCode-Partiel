import { useState, useCallback } from 'react';
import * as cardService from '@/services/cardService';
import { ICard } from '@/interface/card.interface';

interface UseCardHook {
  cards: ICard[];
  loading: boolean;
  error: string | null;
  createCard: (payload: ICard) => Promise<void>;
  getCardById: (cardId: string) => Promise<void>;
  getAllCards: () => Promise<void>;
  updateCardById: (cardId: string, payload: ICard) => Promise<void>;
  deleteCardById: (cardId: string) => Promise<void>;
  answerCard: (cardId: string, answer: boolean) => Promise<void>;
  getQuizzCard: () => Promise<void>;
}

export const useCards = (): UseCardHook => {
  const [cards, setCards] = useState<ICard[]>([]);
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

  const createCard = useCallback(async (payload: ICard) => {
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

  const updateCardById = useCallback(async (cardId: string, payload: ICard) => {
    await handleApiResponse(() => cardService.updateCardById(cardId, payload));
  }, [handleApiResponse]);

  const deleteCardById = useCallback(async (cardId: string) => {
    await handleApiResponse(() => cardService.deleteCardById(cardId));
  }, [handleApiResponse]);

  const answerCard = useCallback(async (cardId: string, isValid: boolean) => {
    const payload: { isValid: boolean } = { isValid };
    await handleApiResponse(() => cardService.answerCard(cardId, payload));
  }, [handleApiResponse]);

  const getQuizzCard = useCallback(async () => {
    const quizzCard = await handleApiResponse(cardService.getQuizzCard);
    if (Array.isArray(quizzCard)) {
      setCards(quizzCard);
    }
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
    getQuizzCard,
  };
};
