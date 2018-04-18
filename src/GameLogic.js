// All possible suits, shorthand for Spades, Clubs, Hearts, Diamonds
export const ALL_SUITS = ['s', 'c', 'h', 'd'];

// All possible numbers, 2 - Ace
export const ALL_NUMBERS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

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

// Check if a given move is going to be valid or not
export function isValidMove(state, colNumber, colPosition, newColNumber) {
  let moveColumn = state.cardColumns[colNumber];

  // Check if it's the last card in the column
  if (colPosition !== moveColumn.length - 1) {
    return false;
  }
  let cardToMove = moveColumn[colPosition];

  // TODO: Get stack of cards, see if it's legal to drag this many, or maybe do this at onDrag event time
  let landColumn = state.cardColumns[newColNumber];
  if (landColumn.length === 0) {
    return true;
  }
  let cardToLand = landColumn[landColumn.length - 1];

  return areSuitsStackable(cardToLand.suit, cardToMove.suit)
      && areNumbersStackable(cardToLand.number, cardToMove.number);
}

// Move a card from one column to another
export function executeMove(state, colNumber, colPosition, newColNumber) {
  let newState = Object.assign({}, state);
  let moveColumn = newState.cardColumns[colNumber];

  // Remove card from original column
  let cardToMove = moveColumn.pop();

  let landColumn = newState.cardColumns[newColNumber];
  // Push card onto end of new column
  landColumn.push(cardToMove);

  return newState;
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
function areNumbersStackable(numberBottom, numberTop) {
  return ALL_NUMBERS.indexOf(numberTop) !== 12
      && ALL_NUMBERS.indexOf(numberTop) === ALL_NUMBERS.indexOf(numberBottom) - 1;
}
