import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useCards } from '@/hooks/useCards';

interface CardData {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
}

const Grid: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const { getAllCards } = useCards();

  async function fetchAllCards(): Promise<void> {
    try {
      const loadedCards = await getAllCards();
      if (Array.isArray(loadedCards)) {
        setCards(loadedCards);
      } else {
        throw new Error("Les données chargées ne sont pas un tableau");
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des cartes:', error);
    }
  }

  useEffect(() => {
    fetchAllCards();
  }, [getAllCards]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          description={card.description}
          imageSrc={card.imageSrc}
          tags={card.tags}
        />
      ))}
    </section>
  );
};

export default Grid;
