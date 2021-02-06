import React from "react";
import Card from "./Card";
import EditModal from "./EditModal";

export default class CardsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: {},
      showModal: false,
    };
  }
  async componentDidMount() {
    const url = "http://localhost:3000/api/flashcards";
    const response = await fetch(url);
    const data = await response.json();
    let cards = {};

    data.forEach((card) => {
      if (cards[card.flashcard_id]) {
        cards[card.flashcard_id].push(card);
      } else {
        cards[card.flashcard_id] = [card];
      }
    });

    this.setState({ cards });
  }

  render() {
    const showModal = () => {
      this.setState({
        showModal: true,
      });
    };

    const hideModal = () => {
      this.setState({
        showModal: false,
      });
    };

    const flashcards = Object.keys(this.state.cards).map((flashcardId) => (
      <Card
        key={this.state.cards[flashcardId][0].id}
        card={this.state.cards[flashcardId]}
        showModal={showModal}
      />
    ));

    return (
      <div className="bg-white">
        <EditModal
          show={this.state.showModal}
          showModal={showModal}
          hideModal={hideModal}
        />

        <div className="max-w-7xl mx-auto py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12">
            <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Flashcards App
              </h2>
              <p className="text-xl text-gray-500">
                Select a flashcard to edit or view localizations.
              </p>
            </div>
            <ul className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-5 lg:max-w-5xl">
              {flashcards}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
