import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useCards } from '@/hooks/useCards';

const Grid: React.FC = () => {
  const { getQuizzCard, cards } = useCards();
  console.log('cards', cards);

  useEffect(() => {
    getQuizzCard();
  }, [getQuizzCard]);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          title={card.question}
          description={card.answer}
          tags={[card.tag]}
        />
      ))}
    </section>
  );
};

export default Grid;
