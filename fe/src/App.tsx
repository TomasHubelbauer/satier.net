import './App.css';
import React from 'react';
import HomePage from './HomePage';
import TestPage from './TestPage';

export default function App() {
  switch (window.location.pathname) {
    case '/': return <HomePage />;
    case '/test': return <TestPage />;
    default: {
      return (
        <>
          <h1>404</h1>
          <p>This doesn't seem to be a valid Satier page.</p>
        </>
      );
    }
  }
}
