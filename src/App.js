import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
  const [view, setView] = useState('list');

  const handleView = (e, nextView) => {
    console.log("nextView", nextView);
    setView(nextView);
  };
  
  const toggleView = (currView) => {
    console.log("currView", currView);
    const nextView = currView === 'list' ? 'grid' : 'list';
    setView(nextView);
  };

  return (
    <>  
      <Header view={view} handleView={handleView} toggleView={toggleView}/>
      <Main view={view}/>
    </>
  );
}
