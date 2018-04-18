import React, { Component } from 'react';
import Column from './Column/Column.js';
import {ALL_SUITS, ALL_NUMBERS, getRandomCardDeal, isValidMove, executeMove} from './GameLogic.js';
import './GameBoard.css';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardColumns: getRandomCardDeal(),
      foundationCells: [],
      openCells: []
    };

    this.onClickDealNewHand = this.onClickDealNewHand.bind(this);
    this.handleAttemptMoveCard = this.handleAttemptMoveCard.bind(this);
  }

  onClickDealNewHand(e) {
    this.setState({cardColumns: getRandomCardDeal()});
  }

  handleAttemptMoveCard(originalColNumber, originalColPosition, newColNumber) {
    if (isValidMove(this.state, originalColNumber, originalColPosition, newColNumber)) {
      let newState = executeMove(this.state, originalColNumber, originalColPosition, newColNumber);
      this.setState(newState);
    }
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.onClickDealNewHand}>Deal new hand!</button>
        <div className="GameBoard">
          {this.state.cardColumns.map((column, index) =>
            <Column
              key={index}
              cards={column}
              colNumber={index}
              onAttemptMoveCard={this.handleAttemptMoveCard}></Column>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default GameBoard;
