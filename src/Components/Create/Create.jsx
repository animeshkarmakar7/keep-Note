import React, { useState } from 'react';
import './Create.css';

const Create = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="create-container">  
      <form onSubmit={handleSubmit}>
        <div className="create-input-title">
          <input 
            type="text" 
            placeholder="Enter Your Title..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="create-input">
          <textarea 
            type="text" 
            placeholder="Type here..." 
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="create-button">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Create;

