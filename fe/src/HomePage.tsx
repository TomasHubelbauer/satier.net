import './HomePage.scss';
import React, { useState, ChangeEventHandler, KeyboardEventHandler, useRef, useEffect } from 'react';
import useApi, { Operation } from './useApi';

export default function HomePage() {
  const [title, setTitle] = useState('');

  const [recordFoodOperation, setRecordFoodOperation] = useState<Operation<object> | null>(null);
  const { recordFood } = useApi();

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  });

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = event => {
    setTitle(event.currentTarget.value);
  }

  const handleTitleKeyDown: KeyboardEventHandler<HTMLInputElement> = event => {
    if (event.key === 'Enter') {
      handleRecordButtonClick();
    }
  };

  const handleRecordButtonClick = () => {
    setRecordFoodOperation(recordFood(title));
    setTitle('');
  }

  const isRecordFoodExecuting = recordFoodOperation !== null && recordFoodOperation.state === 'progress';
  return (
    <div className="HomePage">
      <h1>
        <img alt="logo" src="logo.png" />
        Satier
      </h1>
      <div className="editor">
        <input
          placeholder="Type the name of the food… Press Enter to submit."
          value={title}
          onChange={handleTitleChange}
          onKeyDown={handleTitleKeyDown}
          ref={titleInputRef}
          disabled={isRecordFoodExecuting}
        />
        <button
          disabled={title === '' || isRecordFoodExecuting}
          onClick={handleRecordButtonClick}
        >
          Record
        </button>
      </div>
      {recordFoodOperation !== null && recordFoodOperation.state === 'progress' && 'Recording…'}
    </div>
  );
}
