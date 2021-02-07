import React from "react";

class LanguagesModal extends React.Component {
  constructor(props) {
    super(props);

    const checked = {};

    this.props.languages.forEach(
      (language) => (checked[language.id] = language.enabled)
    );

    this.state = {
      checked,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.languages !== prevProps.languages) {
      const checked = {};

      this.props.languages.forEach(
        (language) => (checked[language.id] = language.enabled)
      );
      this.setState({ checked });
    }
  }

  render() {
    const { show, hide, languages, handleUpdateLanguages } = this.props;

    if (!show) return null;

    const resetState = () => {
      const checked = {};

      this.props.languages.forEach(
        (language) => (checked[language.id] = language.enabled)
      );

      this.setState({ checked });
    };

    const handleOutsideClick = (e) => {
      e.preventDefault();
      resetState();
      hide();
    };

    const handleInsideClick = (e) => {
      e.stopPropagation();
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const update = Object.keys(this.state.checked).map((id) => {
        return {
          id: +id,
          enabled: this.state.checked[id],
        };
      });

      const response = await fetch("http://localhost:3000/api/languages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });

      if (response.status === 200) {
        handleUpdateLanguages(update);
      }
    };

    const languagesSelectors = languages.map((language) => {
      const handleCheck = () => {
        const checked = Object.assign(this.state.checked, {
          [language.id]: !this.state.checked[language.id],
        });
        this.setState({ checked });
      };

      return (
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              name={language.name}
              defaultChecked={language.enabled}
              disabled={language.id === 1}
              type="checkbox"
              checked={this.state.checked[language.id]}
              class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              onClick={handleCheck}
            />
          </div>
          <div class="ml-3 text-sm">
            <label for="comments" class="font-medium text-gray-700">
              {language.name}
            </label>
            <p class="text-gray-500">Enable {language.name} localizations</p>
          </div>
        </div>
      );
    });

    return (
      <div
        className="fixed z-10 inset-0 overflow-y-auto"
        onClick={handleOutsideClick}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
            onClick={handleInsideClick}
          >
            <div>
              <form onSubmit={handleSubmit}>
                <div class="shadow overflow-hidden sm:rounded-md">
                  <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <fieldset>
                      <legend class="text-base font-medium text-gray-900">
                        Localizations
                      </legend>
                      <div class="mt-4 space-y-4">{languagesSelectors}</div>
                    </fieldset>
                  </div>
                  <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LanguagesModal;
