import React, { useEffect, useState } from 'react';

export default function TestPage() {
  const [api, setApi] = useState('');
  useEffect(() => {
    void async function () {
      const response = await fetch('/api');
      const text = await response.text();
      setApi(text);
    }()
  }, []);

  return (
    <>
      {api}
    </>
  );
}
