import React, { Component } from 'react';
import {suitShortToFullNameMap} from '../Common.js';

import './Card.css';

class Card extends Component {

  constructor(props) {
    super(props);
    this.onDrag = this.onDrag.bind(this);
  }

  onDrag(e) {
    e.dataTransfer.setData("text", this.props.position);
  }

  render() {
    return (
      <div className="Card" draggable="true" onDragStart={this.onDrag}>
        <div className="Card-number">{this.props.number}</div>
        <div className={ `suit-icon ${suitShortToFullNameMap[this.props.suit]}` }></div>
      </div>
    );
  }
}

export default Card;
