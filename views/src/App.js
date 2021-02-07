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
    let url = "http://localhost:3000/api/languages";
    let response = await fetch(url);
    let data = await response.json();
    this.setState({ languages: data });

    url = "http://localhost:3000/api/flashcards";
    response = await fetch(url);
    data = await response.json();

    data.forEach((card) => {
      const locals = this.state.languages.slice(1).map((language) => {
        const record = card.locals.find(
          (local) => local.languageId === language.id
        );
        if (record) return record;
        return {
          languageId: language.id,
          content: "",
          title: "",
        };
      });
      card.locals = locals;
    });

    this.setState({ cards: data });
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
      const card = this.state.cards.find((card) => card.id === id);
      // const locals = this.state.languages
      //   .filter((language) => language.enabled && language.id !== 1)
      //   .map((local) => {
      //     const existing = card.locals.find(
      //       (l) => (l.languageId = local.languageId)
      //     );
      //     if (existing) {
      //       return existing;
      //     } else {
      //       return {
      //         languageId: local.languageId,
      //         content: "",
      //         title: "",
      //       };
      //     }
      //   });

      this.setState({
        currentCard: card,
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

    const handleUpdateLanguages = (langs) => {
      const languages = langs.map((lang) => {
        const name = this.state.languages.find((l) => l.id === lang.id).name;
        return Object.assign({}, lang, { name });
      });

      this.setState({ languages });
      hideLanguagesModal();
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
          handleUpdateLanguages={handleUpdateLanguages}
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
