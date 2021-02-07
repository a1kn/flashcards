import React from "react";

class CardsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      locals: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.languages !== prevProps.languages) {
      this.setState({
        locals: this.props.languages.map((language) => {
          return {
            title: "",
            languageId: language.id,
            content: "",
          };
        }),
      });
    }

    if (
      this.props.card !== prevProps.card &&
      Object.keys(this.props.card).length > 0
    ) {
      this.setState({
        title: this.props.card.title,
        content: this.props.card.content,
      });

      this.setState({
        locals: this.state.locals.map((local) => {
          const record = this.props.card.locals.find(
            (l) => l.languageId === local.languageId
          );
          if (record) return record;
          return local;
        }),
      });
    }
  }

  render() {
    const { show, hideModal, card, languages, handleNewCard } = this.props;
    if (!show) return null;

    const resetState = () => {
      this.setState({
        title: "",
        content: "",
        locals: [],
      });

      this.setState({
        locals: languages.map((language) => {
          return {
            title: "",
            languageId: language.id,
            content: "",
          };
        }),
      });
    };

    const handleOutsideClick = (e) => {
      e.preventDefault();
      resetState();
      hideModal();
    };

    const handleInsideClick = (e) => {
      e.stopPropagation();
    };

    const handleTitleChange = (e) => {
      this.setState({
        title: e.target.value,
      });
    };

    const handleContentChange = (e) => {
      this.setState({
        content: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const response = await fetch("http://localhost:3000/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      });

      if (response.status === 200) {
        const id = await response.json();
        const newCard = Object.assign(this.state, id, {});
        handleNewCard(newCard);
      }
    };

    const enabledLanguages = languages
      .slice(1)
      .filter((language) => language.enabled)
      .map((language) => {
        const local = this.state.locals.find(
          (local) => local.languageId === language.id
        );

        const handleLocalTitleChange = (e) => {
          this.setState({
            locals: this.state.locals.map((a) => {
              if (a.languageId === local.languageId) {
                const update = Object.assign(a, {});
                update.title = e.target.value;
                return update;
              }
              return a;
            }),
          });
        };

        const handleLocalContentChange = (e) => {
          this.setState({
            locals: this.state.locals.map((a) => {
              if (a.languageId === local.languageId) {
                const update = Object.assign(a, {});
                update.content = e.target.value;
                return update;
              }
              return a;
            }),
          });
        };

        return (
          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              for={language.name.toLowerCase() + "title"}
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {language.name} Title
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                type="text"
                name="title"
                id="title"
                className="p-2 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                value={local ? local.title : ""}
                onChange={handleLocalTitleChange}
              />
            </div>
            <label
              for="content"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              {language.name} Content
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <textarea
                id="content"
                name="content"
                rows="2"
                className="p-2 max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                value={local ? local.content : ""}
                onChange={handleLocalContentChange}
              ></textarea>
              <p className="mt-2 text-sm text-gray-500">
                Enter the localized content for {language.name} here.
              </p>
            </div>
          </div>
        );
      });

    return (
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          onClick={handleOutsideClick}
        >
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            onClick={handleInsideClick}
          >
            <form
              className="space-y-8 divide-y divide-gray-200"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6 sm:space-y-5">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {Object.keys(card).length > 0 ? "Edit" : "Add"}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {Object.keys(card).length > 0
                      ? "Edit this flashcard"
                      : "Add a new flashcard."}
                  </p>
                </div>

                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      for="first_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Title
                    </label>

                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="p-2 max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                        value={this.state.title}
                        onChange={handleTitleChange}
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      for="content"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Content
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <textarea
                        id="content"
                        name="content"
                        rows="5"
                        className="p-2 max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        value={this.state.content}
                        onChange={handleContentChange}
                      ></textarea>
                      <p className="mt-2 text-sm text-gray-500">
                        Write the content you would like to appear on the
                        flashcard.
                      </p>
                    </div>
                  </div>

                  {enabledLanguages}
                </div>

                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  >
                    Submit
                  </button>
                  <button
                    onClick={hideModal}
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CardsModal;
