import React, { Component } from 'react';
import Column from './Column/Column.js';
import './GameBoard.css';

// All possible suits, shorthand for Spades, Clubs, Hearts, Diamonds
const suits = ['s', 'c', 'h', 'd'];

// All possible numbers, 2 - Ace
const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// A sorted deck of cards
const sortedDeck = (function() {
  let arr = [];
  suits.forEach(suit => {
    numbers.forEach(number => {
      arr.push({'suit': suit, 'number': number})
    })
  });
  return arr;
})();

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {cardColumns: this.getRandomCardDeal()};
    this.onClickDealNewHand = this.onClickDealNewHand.bind(this);
  }

  getRandomCardDeal() {
    // Get a new deck and shuffle it
    let newDeck = sortedDeck.slice();
    newDeck = this.shuffleArray(newDeck);

    // Initial card positions is an array of 8 arrays (for each column)
    let cardColumns = [[], [], [], [], [], [], [], []];
    let column = 0;

    // Distribute the shuffled deck into the card columns
    while (newDeck.length > 0) {
      cardColumns[column].push(newDeck.pop());
      column = (column >= 7) ? 0 : column + 1;
    }
    return cardColumns;
  }

  shuffleArray(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
  }

  onClickDealNewHand(e) {
    this.setState({cardColumns: this.getRandomCardDeal()});
  }


  render() {
    return (
      <div>
      <button onClick={this.onClickDealNewHand}>Deal new hand!</button>
      <div className="GameBoard">
        {this.state.cardColumns.map((column, index) =>
          <Column key={index} cards={column}></Column>
        )}
      </div>
      </div>
    );
  }
}

export default GameBoard;
