import React from 'react';
import './Create.css';

const Create = () => {
  return (
    <div className="create-container">
      <div className="header">
        Create Something
      </div>
      <div className="create-input">
        <input type="text" placeholder="Type here..." />
      </div>
    </div>
  );
};

export default Create;
