import React, { Component } from 'react';
import './Card.css';

class Card extends Component {

  constructor(props) {
    super(props);
    this.onDrag = this.onDrag.bind(this);
  }

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

  onDrag(e) {
    e.dataTransfer.setData("text", this.props.colNumber + '/' + this.props.colPosition);
  }

  render() {
    return (
      <div className="Card" draggable="true" onDragStart={this.onDrag}>
        <div className="Card-number">{this.props.number}</div>
        <div className={ `suit-icon ${this.computeSuitName(this.props.suit)}` }></div>
      </div>
    );
  }
}

export default Card;
