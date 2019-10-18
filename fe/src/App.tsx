import './App.css';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [api, setApi] = useState('');
  useEffect(() => {
    void async function () {
      const response = await fetch('/api');
      const text = await response.text();
      setApi(text);

    }()
  }, []);

  switch (window.location.pathname) {
    case '/': {
      return (
        <>
          <h1>
            <img alt="logo" src="logo.png" />
            Satier
          </h1>
          <p>API response: {api}</p>
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
