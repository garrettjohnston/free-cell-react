import React, { Component } from 'react';
import Tableau from './Cells/Tableau.js';
import FoundationCell from './Cells/FoundationCell.js';
import OpenCell from './Cells/OpenCell.js';
import {ALL_SUITS, ALL_NUMBERS} from './Common.js';
import * as gameLogic from './GameLogic.js';
import './GameBoard.css';

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign(
      {
        maxCardsToMove: 4
      },
      this.getNewDealObject()
    );

    this.onClickDealNewHand = this.onClickDealNewHand.bind(this);
    this.attemptMoveCardToTableau = this.attemptMoveCardToTableau.bind(this);
    this.attemptMoveCardToFoundation = this.attemptMoveCardToFoundation.bind(this);
    this.attemptMoveCardToOpenCell = this.attemptMoveCardToOpenCell.bind(this);
  }

  onClickDealNewHand(e) {
    this.setState(this.getNewDealObject());
  }

  getNewDealObject() {
    return {
      cardTableaux: gameLogic.getRandomCardDeal(),
      foundationCells: [null, null, null, null],
      openCells: [null, null, null, null]
    };
  }

  attemptMoveCardToTableau(position, newTableauNumber) {
    if (gameLogic.isValidMoveToTableau(this.state, position, newTableauNumber)) {
      let newState = gameLogic.executeMoveToTableau(this.state, position, newTableauNumber);
      this.setState(newState);
    }
  }

  attemptMoveCardToFoundation(position, foundationNumber) {
    if (gameLogic.isValidMoveToFoundation(this.state, position, foundationNumber)) {
      let newState = gameLogic.executeMoveToFoundation(this.state, position, foundationNumber);
      this.setState(newState);
    }
  }

  attemptMoveCardToOpenCell(position, openCellNumber) {
    if (gameLogic.isValidMoveToOpenCell(this.state, position, openCellNumber)) {
      let newState = gameLogic.executeMoveToOpenCell(this.state, position, openCellNumber);
      this.setState(newState);
    }
  }

  render() {
    return (
      <React.Fragment>
        <button onClick={this.onClickDealNewHand}>Deal new hand!</button>
        <div className="GameBoard">
          <div className="GameBoard-Foundation">
            {this.state.foundationCells.map((card, index) =>
              <FoundationCell
                key={ALL_SUITS[index]}
                foundationNumber={index}
                card={card}
                onAttemptMoveCard={this.attemptMoveCardToFoundation}>
              </FoundationCell>
            )}
          </div>

          <div className="GameBoard-OpenCell">
            {this.state.openCells.map((card, index) =>
              <OpenCell
                key={ALL_SUITS[index]}
                openCellNumber={index}
                card={card}
                onAttemptMoveCard={this.attemptMoveCardToOpenCell}>
              </OpenCell>
            )}
          </div>

          {this.state.cardTableaux.map((tableau, index) =>
            <Tableau
              key={index}
              cards={tableau}
              tableauNumber={index}
              onAttemptMoveCard={this.attemptMoveCardToTableau}>
            </Tableau>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default GameBoard;
