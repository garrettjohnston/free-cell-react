import React, { Component } from 'react';
import Card from '../Card/Card.js';
import './Tableau.css';

class Tableau extends Component {
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
    this.props.onAttemptMoveCard(position, this.props.tableauNumber);
  }

  render() {
    return (
      <div className="Tableau" onDragOver={this.onDragOver} onDrop={this.onDrop}>
        {this.props.cards.map((card, index) =>
          <div className="Tableau-positioner" style={this.computePosition(index)} key={card.number + card.suit}>
            <Card
              position={`TABLEAU:${this.props.tableauNumber}/${index}`}
              suit={card.suit}
              number={card.number}>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default Tableau;
