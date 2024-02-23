"use client";
import React, { useState } from 'react';
import Grid from '@/components/Grid';
import { useCards } from '@/hooks/useCards'; // Assurez-vous que le chemin d'accès est correct


const AnyPage: React.FC = () => {
  const { createCard } = useCards();

  const handleCreateCard = async () => {
    const newCard = {
      title: '',
      description: '',
      imageSrc: '',
      tags: ['nouveauTag']
    };

    // Supposons que `createCard` a été ajusté pour accepter ce format
    await createCard({
      question: newCard.title,
      answer: newCard.description,
      tag: newCard.tags[0] // Adaptez selon la logique de votre backend
    });
  };

  return (
    <div>
      <h1>Your Page Title</h1>
      <button onClick={handleCreateCard} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Créer une Carte
      </button>
      <Grid />
    </div>
  );
};

export default AnyPage;
