import React from 'react';
import CardComponent from './Card';

interface Card {
  question: string;
  answer: string;
  tag: string;
}

interface GridProps {
  cards: Card[];
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
