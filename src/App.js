import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header'
import Main from './components/Main'
import styles from './styles/Style'

// Keep same std
import Typography from '@material-ui/core/Typography';
import { Pagination } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Card, CardContent, CardMedia } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';


export default function App() {
  const classes = styles();

  const [view, setView] = useState('list');

  const handleView = (e, nextView) => {
    setView(nextView);
  };

  return (
        <>  
          {/* react fragment short <> */}
          {/* 
          main component: Appjs
          header, body, footer components
          handle view function in main component
          state should be passed to other components

          view more as poup component to body content
           */}

      <Header view={view} handleView={handleView}/>
      <Main view={view}/>

    
      
    </>
  );
}

// export default App;
