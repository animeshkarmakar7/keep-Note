import React, { useState } from 'react';
import SideNavbar from './Components/SideNavbar/SideNavbar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home/home';
import Create from './Components/Create/Create';
import './App.css'; 

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  return (
    <BrowserRouter>
      <SideNavbar onToggle={handleToggle} />
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />     
          <Route path="/create" element={<Create />} />   
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
