import React from 'react';
import styles from '../styles/Style'
import ViewMore from './ViewMore'


import { Avatar, Divider, List, ListItem, ListItemText, ListItemAvatar, Typography } from '@material-ui/core';
import moment from 'moment';

export default function ListView({ handleClose, launches, showDetails, view, viewDetails }){
  const classes = styles();
  return (
    <List className={classes.root}>
      {launches.map((launch, _) => (
        (view === 'list') && <>
        {!showDetails[launch.id] && 
        <ListItem alignItems="flex-start" key={launch.id} onClick={() => viewDetails(launch.id)}>
        <ListItemAvatar>
          <Avatar alt={launch.name} title={launch.name} src={launch.links.patch.small} />
        </ListItemAvatar>
        <ListItemText
          primary={launch.name + launch.id}
          secondary={
            <>
              <Typography noWrap variant="body2" component="span" color="textPrimary" display="block">
                {launch.details}
              </Typography>
              <Typography variant="body2" component="span" color="textSecondary" display="block">
                Launch: {moment(launch.date_utc).format("MMMM Do YYYY, h:mm:ss a")} (UTC)
              </Typography>
            </>
          }
        />
      </ListItem>}
      <Divider variant="inset" component="li"/>
      
      {showDetails[launch.id] && 
      <ViewMore showDetails={showDetails} launch={launch} handleClose={handleClose}/>}
      </>
      ))}
    </List>
  );
}