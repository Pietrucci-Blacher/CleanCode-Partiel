import React, { useState } from 'react';
import { Typography, Card, CardContent, Box, Chip, styled } from '@mui/material';

interface CardProps {
  title: string;
  description: string;
  tags: string[];
}

const FlipCard = styled('div')({
  perspective: '1000px',
  width: '345px', // Largeur fixe
  height: '200px', // Hauteur fixe
  margin: 'auto',
});

const FlipCardInner = styled('div')<{ flipped: boolean }>(
  ({ flipped }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.8s',
    transformStyle: 'preserve-3d',
    transform: flipped ? 'rotateY(180deg)' : 'none',
  })
);

const FlipCardFace = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
});

const FlipCardFront = styled(FlipCardFace)({
  backgroundColor: 'white',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const FlipCardBack = styled(FlipCardFace)({
  backgroundColor: 'white',
  transform: 'rotateY(180deg)',
});

const CardComponent: React.FC<CardProps> = ({ title, description, tags }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => setIsFlipped(!isFlipped);

  return (
    <FlipCard onClick={toggleFlip}>
      <FlipCardInner flipped={isFlipped}>
        <FlipCardFront>
          <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Box sx={{ alignSelf: 'flex-start', p: 1 }}>
                {tags.map((tag, index) => (
                  <Chip key={index} label={`#${tag}`} size="small" />
                ))}
              </Box>
            </CardContent>
          </Card>
        </FlipCardFront>
        <FlipCardBack>
          <Card sx={{ width: '100%', height: '100%' }}>
            <CardContent sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              textAlign: 'center',
              width: '100%', 
              height: '100%' 
            }}>
              <Typography variant="body2">{description}</Typography>
            </CardContent>
          </Card>
        </FlipCardBack>
      </FlipCardInner>
    </FlipCard>
  );
};

export default CardComponent;
