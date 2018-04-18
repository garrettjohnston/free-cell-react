import React, { Component } from 'react';
import Card from '../Card/Card.js';
import './Column.css';

class Column extends Component {
  constructor(props) {
    super(props);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  computePosition(index) {
    return {
      top: index * 20
    };
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDrop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    let originalColNumber = data.split('/')[0];
    let originalColPosition = parseInt(data.split('/')[1], 10);
    this.props.onAttemptMoveCard(originalColNumber, originalColPosition, this.props.colNumber);
  }

  render() {
    return (
      <div className="Column" onDragOver={this.onDragOver} onDrop={this.onDrop}>
        {this.props.cards.map((card, index) =>
          <div className="Column-positioner" style={this.computePosition(index)} key={card.number + card.suit}>
            <Card
              colNumber={this.props.colNumber}
              colPosition={index}
              suit={card.suit}
              number={card.number}
              style={{color: 'red'}}>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Column;
