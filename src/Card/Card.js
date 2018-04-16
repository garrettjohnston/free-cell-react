import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

  computeSuitName(suit) {
    switch (suit) {
      case 'c':
        return 'club';
      case 'h':
        return 'heart';
      case 's':
        return 'spade';
      case 'd':
        return 'diamond';
      default:
        console.error('Invalid suit type', suit);
        return '';
    }
  }

  render() {
    return (
      <div className="Card">
        <div className="Card-number">{this.props.number}</div>
        <div className={ `suit-icon ${this.computeSuitName(this.props.suit)}` }></div>
      </div>
    );
  }
}

export default Card;
