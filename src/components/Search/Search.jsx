import React from 'react';
import RepoService from 'src/services/RepoService';
import { Typeahead } from 'react-bootstrap-typeahead';
import './Search.scss';

class Search extends React.Component {

  /**
   * @param {{full_name:string}} suggestion
   */

  state = {
    value: '',
    selected: null,
    options: [ 'John', 'Miles', 'Charles', 'Herbie' ]
  };

  repoService = new RepoService();

  render() {
    const {options, selected} = this.state;
    return (
      <Typeahead
        onChange={ selected => this.setState({selected}) }
        options={ options }
        selected={ selected }
      />
    );
  }
}

export default Search;