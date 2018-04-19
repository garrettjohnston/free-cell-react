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
    var position = e.dataTransfer.getData("text");
    this.props.onAttemptMoveCard(position, this.props.colNumber);
  }

  render() {
    return (
      <div className="Column" onDragOver={this.onDragOver} onDrop={this.onDrop}>
        {this.props.cards.map((card, index) =>
          <div className="Column-positioner" style={this.computePosition(index)} key={card.number + card.suit}>
            <Card
              position={`COLUMN:${this.props.colNumber}/${index}`}
              suit={card.suit}
              number={card.number}>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Column;
