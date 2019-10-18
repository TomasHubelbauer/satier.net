import './App.css';
import React from 'react';

const App: React.FC = () => {
  switch (window.location.pathname) {
    case '/': {
      return (
        <>
          <h1>
            <img alt="logo" src="logo.png" />
            Satier
          </h1>
          <a href="./test">Test</a>
        </>
      );
    }
    case '/test': {
      return (
        <>
          <h1>Test</h1>
          <p>This is a test page.</p>
        </>
      );
    }
    default: {
      return (
        <>
          <h1>404</h1>
        </>
      );
    }
  }
}

export default App;
