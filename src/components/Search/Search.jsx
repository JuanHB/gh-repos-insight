import React from 'react';
import RepoService from 'src/services/RepoService';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './Search.scss';
import propTypes from 'prop-types';

// default empty results message
const EMPTY_LABEL = 'User not found';

class Search extends React.Component {

  /**
   * @param {{full_name:string}} suggestion
   */

  state = {
    isLoading: false,
    options: [],
    emptyLabel: EMPTY_LABEL,
    query: '',
  };

  render() {
    const {isLoading, options, emptyLabel} = this.state;
    return (
      <section>
        <AsyncTypeahead
          autoFocus
          options={options}
          onSearch={this._handleSearch}
          onChange={this._handleSelect}
          minLength={2}
          labelKey="full_name"
          isLoading={isLoading}
          emptyLabel={emptyLabel}
          placeholder="Type a GitHub user name to search its repo list..."
        />
      </section>
    );
  }

  _repoService = new RepoService();

  /**
   * Calls the prop function when the user selects a valid value
   * valid !== undefined/null/false/empty...
   * @param selected
   * @private
   */
  _handleSelect = ([selected]) => (
    // Only selects the new value when valid, otherwise do nothing
    selected ? this.props.onSelectRepo(selected) : false
  );

  /**
   * Do the API search
   * @param query
   * @private
   */
  _handleSearch = (query) => {
    this.setState({isLoading: true, options: []});
    this._repoService.searchReposByUser(query)
      .then(({ data: options , slug }) => {
        // default state obj to be set
        let stateToSet = {
          options,
          isLoading: false,
          emptyLabel: EMPTY_LABEL
        };
        // changes the "nothing found" message when the user was found
        // but has no public repos to show
        if(slug === 'no-public-repo'){
          stateToSet.emptyLabel = `User "${query}" has no repos to show`;
        }
        this.setState(stateToSet);
      })
  }
}

Search.propTypes = {
  onSelectRepo: propTypes.func
};

export default Search;