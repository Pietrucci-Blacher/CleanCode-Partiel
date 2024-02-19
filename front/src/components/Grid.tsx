import React from 'react';
import Card from './Card';

interface GridProps {
  cards: {
    title: string;
    description: string;
    imageSrc: string;
    tags: string[];
  }[];
}

const Grid: React.FC<GridProps> = ({ cards }) => (
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

export default Grid;
