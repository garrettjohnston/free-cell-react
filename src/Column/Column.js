import React, { Component } from 'react';
import Card from '../Card/Card.js';
import './Column.css';

class Column extends Component {
  constructor(props) {
    super(props);
  }

  computePosition(index) {
    return {
      top: index * 20
    };
  }

  render() {
    return (
      <div className="Column">
        {this.props.cards.map((card, index) =>
          <div className="Column-positioner" style={this.computePosition(index)}>
            <Card
              key={card.number + card.suit}
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
