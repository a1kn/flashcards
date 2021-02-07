import React from "react";
import CardsContainer from "./CardsContainer";
import CardsModal from "./CardsModal";
import Header from "./Header";
import LanguagesModal from "./LanguagesModal";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      currentCard: {},
      showCardsModal: false,
      showLanguagesModal: false,
      languages: [],
    };
  }

  async componentDidMount() {
    let url = "http://localhost:3000/api/flashcards";
    let response = await fetch(url);
    let data = await response.json();
    this.setState({ cards: data });

    url = "http://localhost:3000/api/languages";
    response = await fetch(url);
    data = await response.json();
    this.setState({ languages: data });
  }

  render() {
    const showCardsModal = () => {
      this.setState({
        showCardsModal: true,
      });
    };

    const hideCardsModal = () => {
      this.setState({
        currentCard: {},
        showCardsModal: false,
      });
    };

    const onCardClick = (id) => {
      this.setState({
        currentCard: this.state.cards.find((card) => card.id === id),
      });

      showCardsModal();
    };

    const handleNewCard = (card) => {
      this.setState({
        cards: [...this.state.cards, card],
      });

      hideCardsModal();
    };

    const handleUpdateCard = (card) => {
      const updatedCards = this.state.cards.map((c) => {
        if (c.id !== card.id) return c;
        return card;
      });

      this.setState({
        cards: updatedCards,
      });

      hideCardsModal();
    };

    const hideLanguagesModal = () => {
      this.setState({ showLanguagesModal: false });
    };

    const showLanguagesModal = () => {
      this.setState({ showLanguagesModal: true });
    };

    return (
      <>
        <CardsModal
          show={this.state.showCardsModal}
          hideModal={hideCardsModal}
          card={this.state.currentCard}
          languages={this.state.languages}
          handleNewCard={handleNewCard}
          handleUpdateCard={handleUpdateCard}
        />
        <LanguagesModal
          languages={this.state.languages}
          show={this.state.showLanguagesModal}
          hide={hideLanguagesModal}
        />
        <Header
          showCardsModal={showCardsModal}
          showLanguagesModal={showLanguagesModal}
          languages={this.state.languages}
        />
        <CardsContainer cards={this.state.cards} onCardClick={onCardClick} />
      </>
    );
  }
}
