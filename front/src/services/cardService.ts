import { mande } from "mande";
import { ICard } from "@/interface/card.interface";

const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;
const CARD_PATH = `${API_ENDPOINT}/cards`;

export const createCard = (payload: object): Promise<ICard> => {
    return mande(CARD_PATH).post(payload);
};

export const getCardById = (cardId: string): Promise<ICard> => {
    const path = `${CARD_PATH}/${cardId}`;
    return mande(path).get();
};

export const getAllCards = (): Promise<ICard[]> => {
    return mande(CARD_PATH).get();
};

export const updateCardById = (cardId: string, payload: object): Promise<ICard> => {
    const path = `${CARD_PATH}/${cardId}`;
    return mande(path).patch(payload);
};

export const deleteCardById = (cardId: string): Promise<void> => {
    const path = `${CARD_PATH}/${cardId}`;
    return mande(path).delete();
};

export const answerCard = (cardId: string, payload: { isValid: boolean }): Promise<void> => {
    const path = `${CARD_PATH}/${cardId}/answer`;
    return mande(path).patch(payload);
};

export const getQuizzCard = (): Promise<ICard[]> => {
    const date: Date = new Date();
    date.setHours(0, 0, 0, 0);
    const path = `${CARD_PATH}/quizz?date=${date}`;
    return mande(path).get();
}
