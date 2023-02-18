import { Component } from 'react';

import css from '../SearchBar/SearchBar.module.css';

export class SearchBar extends Component {
  state = { searchInput: '' };
  onSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.searchInput);
    this.setState({ searchInput: '' });

    this.reset();
  };

  reset = () => {
    this.setState({
      searchInput: '',
    });
  };
  handleOnChangeInput = evt => {
    this.setState({ searchInput: evt.target.value });
  };
  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLabel}>Search</span>
          </button>

          <input
            value={this.state.searchInput}
            onChange={this.handleOnChangeInput}
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
