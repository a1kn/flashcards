import React from 'react';

const Card = ({card}) => {
  const translations = card.slice(1).map(
    local => <li key={local.id}>{local.local_title}: {local.content}</li>
  );

  return (
    <>
      <li>{card[0].title}: {card[0].content}</li>
      <ul>
        {translations}
      </ul>
    </>
  )
};

export default Card;
