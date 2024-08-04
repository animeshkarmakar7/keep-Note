import React, { useState } from 'react';
import './SideNavbar.css';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPlus} from '@fortawesome/free-solid-svg-icons'

const SideNavbar = ({items, onDelete , onToggle }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen); 
  };

  return (
    <div>
      <button className="toggle-button" onClick={toggleNavbar}>☰</button>
      <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
          </li>
          <li>
            <Link style={{ textDecoration: 'none' }} to='/create'>Create
            <FontAwesomeIcon icon={faPlus} />
            </Link>
          </li>
        
          {items.map((item, index) => (
            <li key={index}>
              <Link to={`/note/${index}`} style={{ textDecoration: 'none' }}>
                {item.title}
              </Link>
              <button className='sidebutton' onClick={() => onDelete(index)}>Delete</button>
            </li>
          ))}
        
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
