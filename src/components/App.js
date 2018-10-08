import React, { Component } from 'react';
import Search from 'src/components/Search/Search';
import RepoStats from "./RepoStats/RepoStats";
import './App.scss';

class App extends Component {

  state = {
    repo: null
  };

  render() {
    return (
      <section className="container-fluid">
        <header className="jumbotron-fluid App__header">
          <h2>GitHub User Repos Stats <small>v0.1</small></h2>
        </header>
        <Search
          onSelectRepo={ this._onSelectRepo }
        />
        <RepoStats
          { ...this.state }
        />
      </section>
    );
  }

  _onSelectRepo = repo => this.setState({ repo });

}

export default App;
