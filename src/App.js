import React, { useState, useEffect } from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(2),
  }
}));
function App() {
  const classes = useStyles();

  const [view, setView] = React.useState('list');
  
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            SpaceX
          </Typography>
          <ToggleButtonGroup value={view} exclusive style={{ flex: 1 }}>
            <ToggleButton title="List View" value="list" aria-label="list" >
              <ViewListIcon style={{ color: "white" }} />
            </ToggleButton>
            <ToggleButton title="Grid View" value="module" aria-label="module">
              <ViewModuleIcon style={{ color: "white" }} />
            </ToggleButton>
          </ToggleButtonGroup>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Signup</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default App;
