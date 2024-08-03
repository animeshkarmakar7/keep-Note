import React, { useState } from 'react';
import './SideNavbar.css';
import { Link } from 'react-router-dom';

const SideNavbar = ({ onToggle }) => {
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
            <Link style={{ textDecoration: 'none' }} to='/create'>Create</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNavbar;
