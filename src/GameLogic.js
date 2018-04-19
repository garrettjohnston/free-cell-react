import {ALL_SUITS, ALL_NUMBERS} from './Common.js';

// A sorted deck of cards
const SORTED_DECK = (function() {
  let arr = [];
  ALL_SUITS.forEach(suit => {
    ALL_NUMBERS.forEach(number => {
      arr.push({'suit': suit, 'number': number})
    })
  });
  return arr;
})();

// Get a random dealing of cards and array of 8 arrays (one for each column)
export function getRandomCardDeal() {
  // Get a new deck and shuffle it
  let newDeck = SORTED_DECK.slice();
  newDeck = shuffleArray(newDeck);

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

function shuffleArray(array) {
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

// Check if a given move to a column is going to be valid or not
export function isValidMoveToColumn(state, position, newColNumber) {
  let parsedPosition = parsePosition(position);

  if (isValidMoveFromPosition(state, parsedPosition)) {
    let cardToMove = getCardForPosition(state, parsedPosition);

    // TODO: Get stack of cards, see if it's legal to drag this many, or maybe do this at onDrag event time
    let landColumn = state.cardColumns[newColNumber];
    if (landColumn.length === 0) {
      return true;
    }
    let cardToLand = landColumn[landColumn.length - 1];

    return areSuitsStackable(cardToLand.suit, cardToMove.suit)
        && areNumbersStackable(cardToLand.number, cardToMove.number);
  }
  return false;
}

// Move a card from one location to another column
export function executeMoveToColumn(state, position, newColNumber) {
  let newState = Object.assign({}, state);
  let cardToMove = removeCardAtPosition(newState, position);

  // Push card onto end of new column
  newState.cardColumns[newColNumber].push(cardToMove);

  return newState;
}

// Check if a given move to a foundation is going to be valid or not
export function isValidMoveToFoundation(state, position, foundationNumber) {
  let parsedPosition = parsePosition(position);

  if (isValidMoveFromPosition(state, parsedPosition)) {
    let cardToMove = getCardForPosition(state, parsedPosition);
    let foundationCard = state.foundationCells[foundationNumber];

    // Check if we are placing the card in the right foundation slot (by suit)
    if (cardToMove.suit === ALL_SUITS[foundationNumber]) {
      if (foundationCard === null) {
        return cardToMove.number === 'A';
      } else {
        return areNumbersStackable(cardToMove.number, foundationCard.number);
      }
    }
  }
  return false;
}

// Move a card from one location to a foundation slot
export function executeMoveToFoundation(state, position, foundationNumber) {
  let newState = Object.assign({}, state);
  let cardToMove = removeCardAtPosition(newState, position);

  // Assign card to the foundation slot
  newState.foundationCells[foundationNumber] = cardToMove;

  return newState;
}

// Check if a given move to an open cell is going to be valid or not
export function isValidMoveToOpenCell(state, position, openCellNumber) {
  let parsedPosition = parsePosition(position);

  if (isValidMoveFromPosition(state, parsedPosition)) {
    let openCellCard = state.openCells[openCellNumber];

    // Check if open cell is empty
    return openCellCard === null;
  }
  return false;
}

// Move a card from one location to an open cell
export function executeMoveToOpenCell(state, position, openCellNumber) {
  let newState = Object.assign({}, state);
  let cardToMove = removeCardAtPosition(newState, position);

  // Assign card to the open cell
  newState.openCells[openCellNumber] = cardToMove;

  return newState;
}

// Parse the position string
function parsePosition(position) {
  let [stack, stackIndex] = position.split(':');
  if (stack === 'COLUMN') {
    let [columnNumber, index] = stackIndex.split('/');
    return {
      'stack': 'COLUMN',
      'stackIndex': parseInt(columnNumber, 10),
      'itemIndex': parseInt(index, 10)
    }
  } else {
    return {
      'stack': stack,
      'stackIndex': parseInt(stackIndex, 10)
    }
  }
}

function isValidMoveFromPosition(state, position) {
  switch (position.stack) {
    case 'COLUMN':
      let moveColumn = state.cardColumns[position.stackIndex];
      // Check if it's the last card in the column
      if (position.itemIndex !== moveColumn.length - 1) {
        return false;
      }
      // More logic here about moving "from", i.e. stacked cards (but maybe put this in onDrag handler)
      return true;
    // Initially, you cannot move cards down from the foundation
    case 'FOUNDATION':
      return false;
    // You can move a card from an open cell if there exists a card in it
    case "OPEN":
      return state.openCells[position.stackIndex] !== null;
    default:
      console.error(`Invalid stack type: ${position.stack}`);
      return false;
  }
}

function getCardForPosition(state, position) {
  switch (position.stack) {
    case 'COLUMN':
      return state.cardColumns[position.stackIndex][position.itemIndex];
      // More logic here about moving "from", i.e. stacked cards (but maybe put this in onDrag handler)
    case 'FOUNDATION':
      return state.foundationCells[position.stackIndex];
    case "OPEN":
      return state.openCells[position.stackIndex];
    default:
      console.error(`Invalid stack type: ${position.stack}`);
      return null;
  }
}

// Given a game state, remove a card at position and return it
function removeCardAtPosition(state, position) {
  let parsedPosition = parsePosition(position);
  let cardToMove = getCardForPosition(state, parsedPosition);

  switch (parsedPosition.stack) {
    case 'COLUMN':
      // TODO: Implement multiple cards removal
      state.cardColumns[parsedPosition.stackIndex].pop();
      break;
    case 'FOUNDATION':
      state.foundationCells[parsedPosition.stackIndex] = null;
      break;
    case "OPEN":
      state.openCells[parsedPosition.stackIndex] = null;
      break;
    default:
      console.error(`Invalid stack type: ${parsedPosition.stack}`);
      break;
  }
  return cardToMove;
}

// Helper function takes two suits and returns true if they are opposite colors
// and thus are allowed to be stacked
function areSuitsStackable(suit1, suit2) {
  switch (suit1) {
    case 'h':
    case 'd':
      return suit2 === 's' || suit2 === 'c';
    case 's':
    case 'c':
      return suit2 === 'h' || suit2 === 'd';
    default:
      console.error(`Invalid suit types suit1: ${suit1}, suit2: ${suit2}`);
      return false;
  }
}

// Helper function takes two number and returns true if they are sequential
// and thus are allowed to be stacked
function areNumbersStackable(numberHigher, numberLower) {
  return ALL_NUMBERS.indexOf(numberLower) !== 12
      && ALL_NUMBERS.indexOf(numberLower) === ALL_NUMBERS.indexOf(numberHigher) - 1;
}
