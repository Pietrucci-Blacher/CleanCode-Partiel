import React from 'react';
import Grid from '@/components/Grid';

const CARD_DATA = [
  {
    title: 'Card  1',
    description: 'Description for Card  1',
    imageSrc: 'https://via.placeholder.com/150',
    tags: ['tag1', 'tag2']
  },
  {
    title: 'Card  2',
    description: 'Description for Card  2',
    imageSrc: 'https://via.placeholder.com/150',
    tags: ['tag3', 'tag4']
  },
];

const AnyPage: React.FC = () => {
  return (
    <div>
      <h1>Your Page Title</h1>
      <Grid cards={CARD_DATA} />
    </div>
  );
};

export default AnyPage;
