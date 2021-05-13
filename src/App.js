import React, { useState } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
  const [view, setView] = useState('list');

  const handleView = (e, nextView) => {
    setView(nextView);
  };

  return (
    <>  
      <Header view={view} handleView={handleView}/>
      <Main view={view}/>
    </>
  );
}
