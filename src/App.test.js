import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import cars from './constants/cars.json';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App cars={ cars } />, div);
  ReactDOM.unmountComponentAtNode(div);
});
