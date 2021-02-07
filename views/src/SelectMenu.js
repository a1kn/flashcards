import React from "react";

class SelectMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1
    };
  }

  render() {
    const options = this.props.languages
      .filter((l) => l.enabled)
      .map((language) => {
        if (language.id === 1) {
          return <option selected value={language.id}>{language.name}</option>;
        } else {
          return <option value={language.id}>{language.name}</option>;
        }
      });

    return (
      <div class="p-8 flex items-center justify-center">
        <div class="w-full max-w-xs mx-auto">
          <div>
            <label
              for="local"
              className="block text-sm font-medium text-gray-700"
            >
              Filter by language:
            </label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={this.props.handleSelect}
            >
              {options}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectMenu;
