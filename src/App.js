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
import LinearProgress from '@material-ui/core/LinearProgress';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    marginRight: theme.spacing(2),
  },
  page: {
    display: 'flex',
    flexFlow: 'wrap',
  },
}));
function App() {
  const classes = useStyles();

  const [view, setView] = React.useState('list');
  const [launches, setLaunches] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch(`https://api.spacexdata.com/v4/launches`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        const launches = data.sort((a, b) => new Date(a.date_utc) < new Date(b.date_utc) ? 1 : -1);
        console.log(launches);
        setLaunches(launches)
        // handleData(launches)
        setLoading(false);
      })
      .catch(error => {
        console.log('Looks like there was a problem: \n', error);
      });
  };

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
      <Grid className={classes.root}>
        {loading ? <LinearProgress /> : ''}

        <div className={classes.page}>
          {
            launches.map((res, _) => (
              <React.Fragment>
                <List className={classes.root} >
                  <ListItem alignItems="flex-start" key={res.id} id={res.id}>
                    <ListItemAvatar>
                      <Avatar alt={res.name} title={res.name} src={res.links.patch.small} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={res.name + res.id}
                      secondary={
                        <React.Fragment>
                          <Typography noWrap variant="body2" component="span" color="textPrimary" display="block">
                            {res.details}
                          </Typography>
                          <Typography variant="body2" component="span" color="textSecondary" display="block">
                            Launch: {moment(res.date_utc).format("MMMM Do YYYY, h:mm:ss a")} (UTC)
                          </Typography>
                        </React.Fragment>
                      }
                      />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              </React.Fragment>))
            }
            </div>

      </Grid>
    </div>
  );
}

export default App;
