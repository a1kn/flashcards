import React from "react";

const Card = ({ card, onCardClick }) => {
  const translations = card.locals.map((local) => (
    <li key={local.languageId}>
      {local.title}: {local.content}
    </li>
  ));

  const handleClick = (e) => {
    e.preventDefault();
    onCardClick(card.id);
  };

  return (
    <>
      <li className="uppercase font-bold">
        <div className="space-y-6">
          <a href="" onClick={handleClick}>
            <span className="inline-block mx-auto bg-yellow-200 h-40 w-40 pt-12 pb-6 px-6 rounded-full overflow-auto">
              {card.title}
            </span>
          </a>
        </div>
      </li>
    </>
  );
};

export default Card;
