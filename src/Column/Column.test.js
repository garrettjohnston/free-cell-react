import React from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Column />, div);
  ReactDOM.unmountComponentAtNode(div);
});
