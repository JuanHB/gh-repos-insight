import React, { Component } from 'react';
import logo from 'src/logo.svg';
import Search from 'src/components/Search/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Search />
      </div>
    );
  }
}

export default App;
