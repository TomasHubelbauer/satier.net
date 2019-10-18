import './index.css';
import React from 'react';
import { render, hydrate } from 'react-dom';
import App from './App';

const root = document.getElementById('root')!;
if (root.hasChildNodes()) {
  hydrate(<App />, root);
}
else {
  render(<App />, root);
}
