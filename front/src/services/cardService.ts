import { mande } from "mande";

const CARD_PATH = '/cards';

export const createCard = (payload: object): Promise<any> => {
    return mande(CARD_PATH).post(payload);
};

export const getCardById = (cardId: string): Promise<any> => {
    const path = `${CARD_PATH}/${cardId}`;
    return mande(path).get();
};

export const getAllCards = (): Promise<any> => {
    return mande(CARD_PATH).get();
};

export const updateCardById = (cardId: string, payload: object): Promise<any> => {
    const path = `${CARD_PATH}/${cardId}`;
    return mande(path).patch(payload);
};

export const deleteCardById = (cardId: string): Promise<any> => {
    const path = `${CARD_PATH}/${cardId}`;
    return mande(path).delete();
};

export const answerCard = (cardId: string, payload: object): Promise<any> => {
    const path = `${CARD_PATH}/${cardId}/answer`;
    return mande(path).patch(payload);
};
