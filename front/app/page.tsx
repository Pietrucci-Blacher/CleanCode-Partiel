"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import { ICard } from '@/interface/card.interface';

import Grid from '@/components/Grid';
import { useCards } from '@/hooks/useCards';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AnyPage: React.FC = () => {
  const { cards, createCard, getAllCards } = useCards();
  const [open, setOpen] = useState<boolean>(false);
  const [newCard, setNewCard] = useState<ICard>({ question: '', answer: '', tag: '' });

  useEffect(() => {
    getAllCards();
  }, [getAllCards]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateCard = async () => {
    if (newCard.question && newCard.answer && newCard.tag) {
      await createCard(newCard);
      handleClose();
      setNewCard({ question: '', answer: '', tag: '' });
      await getAllCards();
    } else {
      console.error("Tous les champs doivent être remplis.");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Mes fiches
      </Typography>
      <Button onClick={handleOpen} sx={{ bgcolor: 'blue.500', '&:hover': { bgcolor: 'blue.700' }, fontWeight: 'bold', py: 2, px: 4, borderRadius: 1 }}>
        Créer une Carte
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6">
            Nouvelle carte
          </Typography>
          <TextField
            margin="dense"
            id="question"
            name="question"
            label="Question"
            type="text"
            fullWidth
            value={newCard.question}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="answer"
            name="answer"
            label="Réponse"
            fullWidth
            multiline
            rows={4}
            value={newCard.answer}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="tag"
            name="tag"
            label="Tag"
            type="text"
            fullWidth
            value={newCard.tag}
            onChange={handleChange}
          />
          <Button onClick={handleCreateCard} sx={{ mt: 4, bgcolor: 'blue.500', '&:hover': { bgcolor: 'blue.700' }, fontWeight: 'bold', py: 2, px: 4, borderRadius: 1 }}>
            Enregistrer
          </Button>
        </Box>
      </Modal>
      <Grid cards={cards} />
    </div>
  );
};

export default AnyPage;
