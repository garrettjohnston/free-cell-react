import React, { Component } from 'react';
import GameBoard from './GameBoard.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Let's play some Free Cell!</h1>
        <GameBoard></GameBoard>
      </div>
    );
  }
}

export default App;
