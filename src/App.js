import React, { useEffect } from 'react';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import { ToggleButton, ToggleButtonGroup, Pagination } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import { List, ListItem, ListItemText, ListItemAvatar } from '@material-ui/core';
import { Card, CardContent, CardMedia } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import moment from 'moment';

import Carousel from 'react-material-ui-carousel';
import Paper from '@material-ui/core/Paper';



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
  card: {
    display: 'flex',
    flex: '1 0 auto',
    minWidth: '30%',
    margin: 4,
    [theme.breakpoints.down('md')]: {
      flex: '1 1 auto',
    },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 475,
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: '4px auto',
  },
  paper: {
    position: "absolute",
    width: '30%',
    height: '30%',
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  carousel: {
    maxWidth: "100%",
    maxHeight: "50%",
    margin: 'auto',
    display: 'block',
  },
  showLess: {
    border: "1px solid #ccc",
    float: "right",
    background: "white",
    borderRadius: 3,
    cursor: "pointer"
  },
  viewmore: {
    width: "100%",
  },
  cover: {
    width: "50%",
    height: "300px",
    [theme.breakpoints.down('sm')]: {
      width: "auto",
      height: "auto",
    },
    margin: "auto",
    display: "block"
  },
  cardDetailed: {
    width: "100%"
  },
}));
function App() {
  const classes = useStyles();

  const [view, setView] = React.useState('list');
  const [launches, setLaunches] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [noOfPages, setNoOfPages] = React.useState();
  const [offset, setOffset] = React.useState(0);
  const [countPerPage, setCountPerPage] = React.useState(50);
  const [slice, setSlice] = React.useState([]);
  const [page, setPage] = React.useState(1);

  const [showDetails, setShowDetails] = React.useState({});

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
        setLaunches(launches)
        handleData(launches)
        setLoading(false);
      })
      .catch(error => {
        console.log('Looks like there was a problem: \n', error);
      });
  };

  const handleView = (e, nextView) => {
    setView(nextView);
  };

  const handleData = (launches) => {
    const slice = launches.slice(offset, offset + countPerPage)
    setNoOfPages(Math.ceil(launches.length / countPerPage));
    setSlice(slice)
  };

  const handlePagination = (event, value) => {
    setPage(value);
    const newOffset = (value - 1) * countPerPage;
    setOffset(newOffset);
    const slice = launches.slice(newOffset, newOffset + countPerPage)
    setSlice(slice)
  };

  const viewDeatils = (e) => {
    const id = e.currentTarget.id;
    const details = {}
    details[id] = true;
    setShowDetails(details);
  };

  const handleClose = () => {
    setShowDetails({});
  };

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            SpaceX
          </Typography>
          <ToggleButtonGroup value={view} exclusive style={{ flex: 1 }} onChange={handleView}>
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
            slice.map((res, _) => (
              <React.Fragment key={res.id}>
                { view === 'list' ? (
                  !showDetails[res.id] && <List className={classes.root} >
                    <ListItem alignItems="flex-start" id={res.id} onClick={viewDeatils}>
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
                  </List>)
                  : (
                    !showDetails[res.id] && <Card className={classes.card} id={res.id} onClick={viewDeatils}>
                      <div className={classes.details}>
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            {res.name}
                          </Typography>
                          <Typography variant="body2" component="p" color="textPrimary">
                            {(res.details && (res.details).length > 200) ? (res.details).substring(0, 200) + "..." : (res.details)}
                          </Typography>
                          <Typography variant="body2" component="p" color="textSecondary">
                            Launch: {moment(res.date_utc).format("MMMM Do YYYY, h:mm:ss a")} (UTC)
                          </Typography>
                        </CardContent>
                      </div>
                      <Avatar className={classes.avatar} alt={res.name} title={res.name} src={res.links.patch.small} />
                    </Card>
                  )}

                {showDetails[res.id] && <Paper className={classes.cardDetailed} id={res.id}>
                  <div className={classes.viewmore}>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar className={classes.avatar} alt={res.name} title={res.name} src={res.links.patch.small} />
                      </Grid>
                      <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                          <Grid item xs>
                            <Typography variant="button" component="button" className={classes.showLess} onClick={handleClose}>Show Less
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                              {res.name}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              {res.details}
                            </Typography>
                            {res.rocket && <Typography variant="body2" component="p" color="textPrimary" gutterBottom>
                              Rocket: {res.rocket}
                            </Typography>}
                            {res.payloads.length > 0 && <Typography variant="body2" component="p" color="textPrimary" gutterBottom>
                              Payloads: {res.payloads.map((payload, _) => (
                              payload + ','
                            ))}
                            </Typography>}
                            <Typography variant="body2" component="p" color="textSecondary">
                              Launch: {moment(res.date_utc).format("MMMM Do YYYY, h:mm:ss a")} (UTC)
                            </Typography>
                          </Grid>
                          <Grid item>
                            {res.links.flickr.original.length > 0 && <Carousel>
                              {
                                res.links.flickr.original.map((sliderImage, i) => (sliderImage !== "" && <Paper><img alt="SpaceX Launches" className={classes.carousel} key={i} src={sliderImage} /></Paper>))
                              }
                            </Carousel>}
                          </Grid>
                          <Grid item>
                            {res.links.youtube_id && <CardMedia
                              className={classes.cover}
                              component="iframe"
                              src={`https://www.youtube.com/embed/${res.links.youtube_id}`}
                              title={res.name}
                            />}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Paper>}
              </React.Fragment>))
          }
        </div>
      </Grid>
      <Pagination count={noOfPages} color="primary" page={page} onChange={handlePagination} position="sticky" />
    </div>
  );
}

export default App;
