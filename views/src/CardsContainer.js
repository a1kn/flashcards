import React from 'react';
import Card from './Card';

export default class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
    };
  }
  async componentDidMount() {
    const url = 'http://localhost:3000/api/flashcards';
    const response = await fetch(url);
    const data = await response.json();
    let cards = {};

    data.forEach(card => {
      if (cards[card.flashcard_id]) {
        cards[card.flashcard_id].push(card);
      } else {
        cards[card.flashcard_id] = [card];
      }
    });

    this.setState({ cards });
  }

  render() {
    const flashcards = Object.keys(this.state.cards).map((flashcardId) => 
      <Card key={this.state.cards[flashcardId][0].id} 
        card={this.state.cards[flashcardId]}/>
    );

    return (
      <div>
        <ul>
          {flashcards}
        </ul>
      </div>
    );
  }
};
