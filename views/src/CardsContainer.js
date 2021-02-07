import React from "react";
import Card from "./Card";

const CardsContainer = ({ cards, onCardClick }) => {
  const flashcards = cards.map((card) => (
    <Card key={card.id} card={card} onCardClick={onCardClick} />
  ));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
      <div className="space-y-12">
        <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Flashcards
          </h2>
          <p className="text-xl text-gray-500">Select a flashcard to edit</p>
        </div>
        <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-5 lg:max-w-5xl">
          {flashcards}
        </ul>
      </div>
    </div>
  );
};

export default CardsContainer;
