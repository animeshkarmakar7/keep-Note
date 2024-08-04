import React from 'react';
import { Link } from 'react-router-dom';

const Display = ({ items }) => {
  if (!items || !Array.isArray(items)) {
    return <div>No items to display</div>;
  }

  return (
    <div>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <Link to={`/note/${index}`} style={{ textDecoration: 'none' }}>
          <strong>{item.title}</strong>
          <p>{item.content}</p>
          </Link>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default Display;