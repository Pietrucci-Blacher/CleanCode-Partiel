import React, { useEffect } from 'react';
import CardComponent from './Card';
import { ICard } from '@/interface/card.interface';
import { useCards } from '../hooks/useCards';

interface GridProps {
  cards: ICard[];
}

const Grid: React.FC<GridProps> = ({ cards }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <CardComponent
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
