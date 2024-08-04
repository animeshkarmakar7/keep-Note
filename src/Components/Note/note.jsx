import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './note.css';

const Note = ({ items, setItems }) => {
  const { index } = useParams();
  const noteIndex = parseInt(index);
  const note = items[noteIndex];

  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[noteIndex] = {
        ...newItems[noteIndex],
        title: newTitle,
      };
      return newItems;
    });
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setItems(prevItems => {
      const newItems = [...prevItems];
      newItems[noteIndex] = {
        ...newItems[noteIndex],
        content: newContent,
      };
      return newItems;
    });
  };

  if (!note) {
    return <div>Note not found</div>;
  }

  return (
    <div className="note-container">
      <div className="header-container">
        <input 
          type="text" 
          value={title} 
          onChange={handleTitleChange} 
          placeholder="Enter your title..."
        />
      </div>
      <div className="content">
        <textarea 
          value={content} 
          onChange={handleContentChange} 
          placeholder="Enter your content..."
        />
      </div>
    </div>
  );
};

export default Note;
