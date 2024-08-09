import React, { useState } from 'react';
import SideNavbar from './Components/SideNavbar/SideNavbar';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './Components/Home/home';
import Create from './Components/Create/Create';
import Display from './Components/Display/display';
import Note from './Components/Note/note';
import './App.css'; 
import { useEffect } from 'react';
import { useRef } from 'react';


const App = () => {
  
  const isMounted = useRef(false);
  
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const data = window.localStorage.getItem('data');
    if (data !== null) setItems(JSON.parse(data))
  }, [])

  useEffect(() => {
    if (isMounted.current) {
      window.localStorage.setItem('data', JSON.stringify(items));
    } else {
      isMounted.current = true;
    }
  }, [items])
 

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };


  const handleToggle = (isOpen) => {
    setSidebarOpen(isOpen);
  };

  const handleAddItem = (item) => {
    if (currentItem !== null) {
      // Edit existing item
      setItems(items.map((it, index) => (index === currentItem ? item : it)));
      setCurrentItem(null);
    } else {
      // Add new item
      setItems([...items, item]);
    }
  };
  
  const handleSave = (index, updatedItem) => {
    const updatedItems = [...items];
    updatedItems[index] = updatedItem;
    setItems(updatedItems);
  };

  return (
    <BrowserRouter>
        <SideNavbar 
        items={items} 
        setItems={setItems}
        onDelete={handleDeleteItem} 
        onToggle={handleToggle} 
        onEdit={setCurrentItem}
      />
      <div className={`main-content ${!sidebarOpen ? 'sidebar-closed' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />     
          <Route path="/create" element={<Create onAdd={handleAddItem} item={items[currentItem]} setItems={setItems} />} />   
          <Route 
            path="/display" 
            element={<Display items={items}/>} 
          />
            <Route 
            path="/note/:index" 
            element={<Note items={items} onSave={handleSave} setItems={setItems} />} 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;